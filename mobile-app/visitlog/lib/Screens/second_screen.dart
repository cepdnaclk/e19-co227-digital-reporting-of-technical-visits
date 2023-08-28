import 'package:flutter/material.dart';
import 'package:visitlog/Screens/login_screen.dart';
import 'package:visitlog/services/auth_service.dart';

// ignore: must_be_immutable
class SecondScreen extends StatelessWidget {
  SecondScreen({super.key});
  static String id = 'second_screen';
  String? userImage = AuthService().getUserImage();
  // ignore: non_constant_identifier_names
  String? UserName = AuthService().getUserName();
  // ignore: non_constant_identifier_names
  String? UserEmail = AuthService().getUserEmail();
  // ignore: prefer_typing_uninitialized_variables

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(useMaterial3: true),
      home: Scaffold(
        appBar: AppBar(
          leading: Column(
            children: [
              const SizedBox(height: 8),
              IconButton(
                icon: Icon(Icons.arrow_back_ios_new_rounded),
                onPressed: () {
                  Navigator.pop(context);
                },
              ),
            ],
          ),
          actions: [
            Column(
              children: [
                const SizedBox(height: 15),
                Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      CircleAvatar(
                        backgroundImage: Image.network(
                          userImage ?? '',
                          height: 65,
                          width: 65,
                        ).image,
                      ),
                      const SizedBox(width: 12),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            UserName ?? '',
                            style: TextStyle(fontSize: 12),
                          ),
                          Text(
                            UserEmail ?? '',
                            style: TextStyle(fontSize: 10),
                          )
                        ],
                      )
                    ]),
              ],
            ),
            const SizedBox(width: 15),
            Column(
              children: [
                const SizedBox(height: 8),
                IconButton(onPressed: () {}, icon: Icon(Icons.menu)),
              ],
            )
          ],
        ),
        body: Center(
          child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
            const Text(
              "Welcome to VisitLog",
              style: TextStyle(fontSize: 28),
              textAlign: TextAlign.center,
            ),
            GestureDetector(
                onTap: () async {
                  await AuthService().signOutGoogle();
                  // ignore: use_build_context_synchronously
                  Navigator.pushNamed(context, LoginScreen.id);
                },
                child: Container(
                  height: 60,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(15),
                    color: Colors.white38,
                  ),
                  child: const Text(
                    'Logout',
                    style: TextStyle(
                      color: Colors.black45,
                      fontSize: 25,
                      // fontWeight: FontWeight.w500,
                    ),
                  ),
                )),
          ]),
        ),
      ),
    );
  }
}
