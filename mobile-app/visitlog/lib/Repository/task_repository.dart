import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:get/get.dart';

class TaskRepository extends GetxController {
  final FirebaseFirestore _db = FirebaseFirestore.instance;
  List<Map<String, dynamic>> items = [];
  List<Map<String, dynamic>> upcommingItems = [];
  List<Map<String, String>> jobs = [];

  Query<Object?> getFirestoreCollection(String? email) {
    final CollectionReference jobsCollection = _db.collection('Tasks');
    return jobsCollection.where('email', isEqualTo: email);
  }

  Future<void> fetchData(String email) async {
    final String? userEmail = email; // Replace with the user's email

    final CollectionReference jobsCollection = _db.collection('Tasks');
    final DateTime today = DateTime.now();
    final List<Map<String, dynamic>> fetchedItems = [];
    final List<Map<String, dynamic>> fetchedUpcommingItems = [];
    final List<Map<String, String>> fetchedJobs = [];

    try {
      final QuerySnapshot querySnapshot =
          await jobsCollection.where('email', isEqualTo: userEmail).get();

      for (final QueryDocumentSnapshot documentSnapshot in querySnapshot.docs) {
        final Map<String, dynamic> data =
            documentSnapshot.data() as Map<String, dynamic>;

        final String company = data['company'] ?? '';
        final String title = data['title'] ?? '';
        final String address = data['address'] ?? '';
        final String description = data['description'] ?? '';
        final Timestamp startDate = data['startDate'] as Timestamp;
        final DateTime startDateTime = startDate.toDate();
        final String date = startDateTime.toString();
        final bool isCompleted = data['isCompleted'];
        final bool isArrived = data['isArrived'];
        final String technicianReportUrl = data['technicianReportUrl'] ?? '';
        final String id = documentSnapshot.id;

        print(technicianReportUrl);

        if (startDateTime.year == today.year &&
            startDateTime.month == today.month &&
            startDateTime.day == today.day &&
            isCompleted == false) {
          final Map<String, dynamic> item = {
            'name': company,
            'subTopic': title,
            'location': address,
            'description': description,
            'time': date,
            'isArrived': isArrived,
            'id': id,
            'technicianReportUrl': technicianReportUrl,
          };

          fetchedItems.add(item);
        }
        if (((startDateTime.year == today.year &&
                startDateTime.month == today.month &&
                startDateTime.day > today.day) ||
            (startDateTime.year == today.year &&
                startDateTime.month > today.month) ||
            (startDateTime.year > today.year)) && isCompleted == false) {
          final Map<String, dynamic> item = {
            'name': company,
            'subTopic': title,
            'location': address,
            'description': description,
            'time': date,
            'isArrived': isArrived,
            'id': id,
            'technicianReportUrl': technicianReportUrl,
          };

          fetchedUpcommingItems.add(item);
        }

        if (isCompleted == true) {
          final Map<String, String> item = {
            'name': company,
            'subTopic': title,
            'location': address,
            'description': description,
            'time': date,
            'technicianReportUrl': technicianReportUrl,
          };

          fetchedJobs.add(item);
        }
      }

      // Update your items list with the fetched data
      items = fetchedItems;
      upcommingItems = fetchedUpcommingItems;
      jobs = fetchedJobs;

      // Notify the listeners that the items list has changed
    } catch (e) {
      print('Error fetching data: $e');
    }
  }

  List<Map<String, dynamic>> getItems() {
    return items;
  }

  List<Map<String, dynamic>> getUpcommingItems() {
    return upcommingItems;
  }

  List<Map<String, String>> getJobs() {
    return jobs;
  }
}
