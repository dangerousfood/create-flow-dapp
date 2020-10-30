import HelloWorld from 0x01cf0e2f2f715450

transaction {

  prepare(acct: AuthAccount) {}

  execute {
    log(HelloWorld.hello())
  }
}
 