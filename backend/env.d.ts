declare namespace NodeJS {
    interface ProcessEnv {
        DB_URI: String;
        NODE_ENV: String;
        JWT_SECRET: String;
    }
}