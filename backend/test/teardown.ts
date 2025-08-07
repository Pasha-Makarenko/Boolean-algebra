export default async function globalTeardown() {
  await new Promise(resolve => setTimeout(resolve, 1000))

  setTimeout(() => {
    console.log("Force exiting after timeout")
    process.exit(0)
  }, 3000)
}
