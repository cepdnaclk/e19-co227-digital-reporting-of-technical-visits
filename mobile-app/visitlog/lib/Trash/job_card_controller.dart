// import 'package:get/get.dart';
// import 'package:visitlog/Repository/job_card_repository.dart';
// import 'package:visitlog/services/auth_service.dart';

// class JobCardController extends GetxController {
//   final JobCardRepository _Repository = JobCardRepository();
//   final String? userEmail =
//         AuthService().getUserEmail();

//         // RxBool to track loading state
//   var isLoading = true.obs;
//   // Getter to access the items list from TaskRepository
//   List<Map<String, String>> get taskItems => _Repository.getItems();


//   @override
//   void onInit() {
//     super.onInit();
//     // Initialize or fetch data from TaskRepository here
//     fetchData();

//     // Set up a Firestore snapshot listener
//     final collectionReference = _Repository.getFirestoreCollection(userEmail!);
//     collectionReference.snapshots().listen((querySnapshot) {
//       // Trigger the fetchData function whenever Firestore data changes
//       fetchData();
//     });
//   }

//   Future<void> fetchData() async {
//     isLoading.value = true; // Set loading to true while fetching data
//     try {
//       await _Repository.fetchData(userEmail!);
//     } finally {
//       isLoading.value = false; // Set loading to false when data fetching is complete
//     }
//   }
  
//   // Your other controller methods here
// }