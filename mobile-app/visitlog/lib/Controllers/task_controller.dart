import 'package:get/get.dart';
import 'package:visitlog/Repository/task_repository.dart';
import 'package:visitlog/services/auth_service.dart';

class TaskController extends GetxController {
  final TaskRepository _taskRepository = TaskRepository();
  final String? userEmail = AuthService().getUserEmail();

  // RxBool to track loading state
  var isLoading = true.obs;

  // List<Map<String, String>> get taskItems => _taskRepository.items;
  // To get real-time updates, use this instead:
  Stream<List<Map<String, String>>> get taskItemsStream => _taskRepository.taskItemsStream;

  @override
  void onInit() {
    super.onInit();

    // Initialize or fetch data from TaskRepository here
    fetchData();

    // Set up a stream listener
    taskItemsStream.listen((taskItems) {
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
