import bcrypt from 'bcryptjs'

const SALT_ROUNED_CRYPT = bcrypt.genSaltSync(10)
const bcryptSync = (value: string, salt: number | string = SALT_ROUNED_CRYPT) => bcrypt.hashSync(value, salt)

export { bcryptSync, SALT_ROUNED_CRYPT }
