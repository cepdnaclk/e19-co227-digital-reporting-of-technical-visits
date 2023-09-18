import 'package:get/get.dart';
import 'package:visitlog/Repository/user_repository.dart';
import 'package:visitlog/services/auth_service.dart';

class ProfileController extends GetxController {
  static ProfileController get instance => Get.find();

  // Final _authRepo = Get.put(AuthenticationRepository())
  final _userRepo = Get.put(UserRepository());

  getUserData() {
    final email = AuthService().getUserEmail();
    
    if (email != null) {
      return _userRepo.getUserDetails(email);
    } else {
      Get.snackbar("Error", "Login to continue");
    }
  }
}
