// import { modifyQuery, selectQuery } from "../queries";

// class QueryRequests {
//   getUser(email: string) {
//     const queryString = "SELECT * FROM users WHERE email = ?";
//     return selectQuery(queryString, [email]);
//   }

//   getUserById(id: number) {
//     const queryString = "SELECT * FROM users WHERE id = ?";
//     return selectQuery(queryString, [id]);
//   }

//   registerUser(newUser: { email: string; password: string }) {
//     const queryString = `INSERT INTO users SET email = ?, password = ?`;
//     return modifyQuery(queryString, [newUser.email, newUser.password]);
//   }

//   modifyUser(
//     modifyUser: {
//       email?: string;
//       password?: string;
//     },
//     id: number
//   ) {
//     const queryString = `UPDATE users SET email = ?, password = ? WHERE id = ?`;
//     return modifyQuery(queryString, [
//       modifyUser.email,
//       modifyUser.password,
//       id,
//     ]);
//   }

//   deleteUser(id: number) {
//     const queryString = `DELETE FROM users WHERE id=?`;
//     return modifyQuery(queryString, [id]);
//   }
// }

// export const queryRequests = new QueryRequests();
