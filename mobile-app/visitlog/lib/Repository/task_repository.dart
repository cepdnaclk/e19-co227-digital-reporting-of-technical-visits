import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:rxdart/rxdart.dart';

class TaskRepository {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  List<Map<String, String>> items = [];

  // BehaviorSubject to stream changes to the task items list
  final BehaviorSubject<List<Map<String, String>>> _taskItemsStream =
      BehaviorSubject<List<Map<String, String>>>();

  Future<void> fetchData(String email) async {
    final String? userEmail = email; // Replace with the user's email

    final CollectionReference jobsCollection = _db.collection('Tasks');
    final DateTime today = DateTime.now();
    final List<Map<String, String>> fetchedItems = [];

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
        final bool isVerified = data['isCompleted'];
        final String id = documentSnapshot.id;


        if (startDateTime.year == today.year &&
            startDateTime.month == today.month &&
            startDateTime.day == today.day &&
            isVerified == false) {
          final Map<String, String> item = {
            'name': company,
            'subTopic': title,
            'location': address,
            'description': description,
            'time': date,
            'id': id,
          };

          fetchedItems.add(item);
        }
      }

      // Update your items list with the fetched data
      items = fetchedItems;

      // Notify the listeners that the items list has changed
      _taskItemsStream.add(items);
    } catch (e) {
      print('Error fetching data: $e');
    }
  }

  // Stream to listen for changes to the task items list
  Stream<List<Map<String, String>>> get taskItemsStream {
    return _taskItemsStream.stream;
  }
}
