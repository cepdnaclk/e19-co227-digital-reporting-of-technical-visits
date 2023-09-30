// import 'package:cloud_firestore/cloud_firestore.dart';
// // import 'package:flutter/foundation.dart';

// class UpcommingTaskRepository {
//   List<Map<String, String>> items = [];
//   final FirebaseFirestore _db = FirebaseFirestore.instance;

//   Query<Object?> getFirestoreCollection(String? email) {
//     final CollectionReference jobsCollection = _db.collection('Tasks');
//     return jobsCollection.where('email', isEqualTo: email);
//   }

//   Future<void> fetchData(String email) async {
//     final String? userEmail = email; // Replace with the user's email
//     final CollectionReference jobsCollection = _db.collection('Tasks');
//     final DateTime today = DateTime.now();
//     final List<Map<String, String>> fetchedItems = [];

//     try {
//       final QuerySnapshot querySnapshot =
//           await jobsCollection.where('email', isEqualTo: userEmail).get();

//       for (final QueryDocumentSnapshot documentSnapshot in querySnapshot.docs) {
//         final Map<String, dynamic> data =
//             documentSnapshot.data() as Map<String, dynamic>;

//         final String company = data['company'] ?? '';
//         final String title = data['title'] ?? '';
//         final String address = data['address'] ?? '';
//         final String description = data['description'] ?? '';
//         final Timestamp startDate = data['startDate'] as Timestamp;
//         final DateTime startDateTime = startDate.toDate();
//         final String date = startDateTime.toString();
//         final bool isVerified = data['isCompleted'];

//         if (startDateTime.year >= today.year &&
//             startDateTime.month >= today.month &&
//             startDateTime.day > today.day &&
//             isVerified == false) {
//           final Map<String, String> item = {
//             'name': company,
//             'subTopic': title,
//             'location': address,
//             'description': description,
//             'time': date,
//           };

//           fetchedItems.add(item);
//         }
//       }

//       // Update your items list with the fetched data
//       items = fetchedItems;
//       // if (kDebugMode) {
//       //   print(items);
//       // }
//     } catch (e) {
//       print('Error fetching data: $e');
//     }
//   }

//   List<Map<String, String>> getItems() {
//     return items;
//   }
// }
