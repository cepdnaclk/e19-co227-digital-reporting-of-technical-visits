import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final GoogleSignIn _googleSignIn = GoogleSignIn();
  // ignore: prefer_typing_uninitialized_variables

  //Google Sign In
  signInWithGoogle() async {
    // begin interactive sign in process
    final GoogleSignInAccount? gUser = await _googleSignIn.signIn();

    // obtain auth details from request
    final GoogleSignInAuthentication gAuth = await gUser!.authentication;

    // create a new credential for user
    final credential = GoogleAuthProvider.credential(
      accessToken: gAuth.accessToken,
      idToken: gAuth.idToken,
    );

    // finally, lets sign in
    final authResult = await _auth.signInWithCredential(credential);

    return authResult;
  }

  signInwithEmail(String email, String password) async {
    try {
      final user = await _auth.signInWithEmailAndPassword(
          email: email, password: password);

      return user;
    } catch (e) {
      // ignore: avoid_print
      print("Error with sign in $e");
    }
  }

  signOutGoogle() async {
    await _googleSignIn.signOut();
    await _auth.signOut();
  }

  getFirebaseUser() {
    // print("in the getFirebaseUserEmail");
    // print(_auth.currentUser!);
    return _auth.currentUser!;
  }

  String? getUserImage() {
    if (_auth.currentUser?.photoURL != null) {
      // print(_auth.currentUser?.photoURL);
      return _auth.currentUser?.photoURL;
    } else {
      return "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficons-for-free.com%2Fprofile%2Bprofile%2Bpage%2Buser%2Bicon-1320186864367220794%2F&psig=AOvVaw3SquSzXvD-RJRUQsn45nUW&ust=1693303516480000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLjaqaiN_4ADFQAAAAAdAAAAABAJ";
    }
  }

  String? getUserName() {
    if (_auth.currentUser?.displayName != null) {
      // print(_auth.currentUser?.displayName);
      return _auth.currentUser?.displayName;
    } else {
      return "Profile Name";
    }
  }

  String? getUserEmail() {
    if (_auth.currentUser?.email != null) {
      // print(_auth.currentUser?.email);
      return _auth.currentUser?.email;
    } else {
      return "example@gmail.com";
    }
  }
}
