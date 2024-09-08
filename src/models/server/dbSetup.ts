// // import { db } from "../name";
// // import createAnswerCollection from "./answer.collection";
// // import createQuestionCollection from "./question.collection";
// // import createVoteCollection from "./vote.collection";
// // import createCommentCollection from "./comment.collection";
// // import { databases } from "./config";

// // export default async function getOrCreateDB() {
// //   try {
// //     //   create Databases
// //     await databases.get(db);
// //     console.log("Storage connected");
// //   } catch (error) {
// //     try {
// //       await databases.create(db, db);
// //       console.log("Database Created");
// //       // create Collections
// //       await Promise.all([
// //         createAnswerCollection(),
// //         createQuestionCollection(),
// //         createVoteCollection(),
// //         createCommentCollection(),
// //       ]);
// //       console.log("Collections created");
// //       console.log("Database Connected");
// //     } catch (error) {
// //       console.error("Error created of Databases or Collections", error);
// //     }
// //   }
// //   return databases;
// // }
// import { db } from "../name";
// import createAnswerCollection from "./answer.collection";
// import createCommentCollection from "./comment.collection";
// import createQuestionCollection from "./question.collection";
// import createVoteCollection from "./vote.collection";

// import { databases } from "./config";

// export default async function getOrCreateDB() {
//   try {
//     await databases.get(db);
//     console.log("Database connection");
//   } catch (error) {
//     try {
//       await databases.create(db, db);
//       console.log("database created");
//       //create collections
//       await Promise.all([
//         createQuestionCollection(),
//         createAnswerCollection(),
//         createCommentCollection(),
//         createVoteCollection(),
//       ]);
//       console.log("Collection created");
//       console.log("Database connected");
//     } catch (error) {
//       console.log("Error creating databases or collection", error);
//     }
//   }

//   return databases;
// }

import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

export default async function getOrCreateDB() {
  try {
    await databases.get(db);
    console.log("Database connection");
  } catch (error) {
    try {
      await databases.create(db, db);
      console.log("database created");
      //create collections
      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);
      console.log("Collection created");
      console.log("Database connected");
    } catch (error) {
      console.log("Error creating databases or collection", error);
    }
  }

  return databases;
}
