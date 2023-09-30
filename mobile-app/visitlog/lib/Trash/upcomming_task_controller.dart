// import 'package:get/get.dart';
// import 'package:visitlog/Repository/upcomming_task_repository.dart';
// import 'package:visitlog/services/auth_service.dart';

// class UpcommingTaskController extends GetxController {
//   final UpcommingTaskRepository _taskRepository = UpcommingTaskRepository();
//   final String? userEmail =
//         AuthService().getUserEmail();

//         // RxBool to track loading state
//   var isLoading = true.obs;
//   // Getter to access the items list from TaskRepository
//   List<Map<String, String>> get taskItems => _taskRepository.getItems();

  

//   @override
//   void onInit() {
//     super.onInit();
//     // Initialize or fetch data from TaskRepository here
//     fetchData();

//     // Set up a Firestore snapshot listener
//     final collectionReference = _taskRepository.getFirestoreCollection(userEmail!);
//     collectionReference.snapshots().listen((querySnapshot) {
//       // Trigger the fetchData function whenever Firestore data changes
//       fetchData();
//     });
//   }

//   Future<void> fetchData() async {
//     isLoading.value = true; // Set loading to true while fetching data
//     try {
//       await _taskRepository.fetchData(userEmail!);
//     } finally {
//       isLoading.value = false; // Set loading to false when data fetching is complete
//     }
//   }
  
//   // Your other controller methods here
// }