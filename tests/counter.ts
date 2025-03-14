import * as anchor from "@coral-xyz/anchor";
import type { Program } from "@coral-xyz/anchor";
import type { Counter } from "../target/types/counter";
import { PublicKey } from "@solana/web3.js";
describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Counter as Program<Counter>;
  // Counter PDA
  const [counterPda , _bump] = PublicKey.findProgramAddressSync(
    [Buffer.from("counter")],
    program.programId
  );

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });

  it("Fetch Counter After Initialize", async () => {
    const counter = await program.account.counter.fetch(counterPda);
    console.log("Counter", counter.count);
  });

  it("Increment Counter", async () => {
    // let's add counter pda as a signer
    const tx = await program.methods.increment().accounts({
      counter: counterPda,
    }).rpc();
    console.log("Your transaction signature", tx);
  });

  it("Fetch Counter After Increment", async () => {
    const counter = await program.account.counter.fetch(counterPda);
    console.log("Counter", counter.count);
  });

  it("Decrement Counter", async () => {
    const tx = await program.methods.decrement().accounts({
      counter: counterPda,
    }).rpc();
    console.log("Your transaction signature", tx);
  });
  it("Fetch Counter After Decrement", async () => {
    const counter = await program.account.counter.fetch(counterPda);
    console.log("Counter", counter.count);
  });
});
