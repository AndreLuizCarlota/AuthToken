import md5 from "md5";

class Password {
  encrypt(password: string) {
    return md5(`${password}${process.env.HASH_CONCACT_PASSWORD}`);
  }
}

export { Password };
