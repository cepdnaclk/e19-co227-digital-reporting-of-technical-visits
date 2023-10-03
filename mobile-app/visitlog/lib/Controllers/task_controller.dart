import 'package:get/get.dart';
import 'package:visitlog/Repository/task_repository.dart';
import 'package:visitlog/services/auth_service.dart';

class TaskController extends GetxController {
  final TaskRepository _taskRepository = TaskRepository();
  final String? userEmail = AuthService().getUserEmail();

  // RxBool to track loading state
  var isLoading = true.obs;

  List<Map<String, dynamic>> get taskItems => _taskRepository.items;
  List<Map<String, dynamic>> get upcommingTasks => _taskRepository.upcommingItems;
  List<Map<String, String>> get jobs => _taskRepository.jobs;
  

  @override
  void onInit() {
    super.onInit();

    // Initialize or fetch data from TaskRepository here
    fetchData();

    // Set up a stream listener
   final collectionReference = _taskRepository.getFirestoreCollection(userEmail!);
    collectionReference.snapshots().listen((querySnapshot) {
      // Trigger the fetchData function whenever Firestore data changes
      fetchData();
    });

  }
  

  Future<void> fetchData() async {
    isLoading.value = true; // Set loading to true while fetching data
    try {
      await _taskRepository.fetchData(userEmail!);
    } finally {
      isLoading.value = false; // Set loading to false when data fetching is complete
    }
  }
}
