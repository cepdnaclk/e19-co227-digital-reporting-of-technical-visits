import 'package:flutter/material.dart';
import 'package:visitlog/Components/app_bar.dart';
import 'package:visitlog/Components/drawer.dart';
// import 'package:visitlog/Screens/hidden_drawer.dart';
// import 'package:visitlog/Screens/login_screen.dart';
// import 'package:visitlog/services/auth_service.dart';

class Profile extends StatelessWidget {
  const Profile({super.key});
  static String id = "profile_page";

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        backgroundColor: Color.fromARGB(255, 237, 242, 250),
        drawer: DrawerWidget(id: id),
        appBar: AppBar(
          backgroundColor: Color.fromARGB(255, 237, 242, 250),
          iconTheme: IconThemeData(color: Colors.black54),
          actions: [AppBarRow()],
          elevation: 0,
        ),
        body: const Center(
          child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
            Text(
              "Profile Screen",
              style: TextStyle(fontSize: 28),
              textAlign: TextAlign.center,
            ),
            // GestureDetector(
            //     onTap: () async {
            //       await AuthService().signOutGoogle();
            //       // ignore: use_build_context_synchronously
            //       Navigator.push(context,
            //           MaterialPageRoute(builder: (context) => LoginScreen()));
            //     },
            //     child: Container(
            //       height: 60,
            //       alignment: Alignment.center,
            //       decoration: BoxDecoration(
            //         borderRadius: BorderRadius.circular(15),
            //       ),
            //       child: const Text(
            //         'Logout',
            //         style: TextStyle(
            //           color: Colors.black45,
            //           fontSize: 25,
            //           // fontWeight: FontWeight.w500,
            //         ),
            //       ),
            //     )),
          ]),
        ),
      ),
    );
  }
}
