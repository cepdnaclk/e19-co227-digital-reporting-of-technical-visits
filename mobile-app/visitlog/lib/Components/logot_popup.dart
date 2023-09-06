import 'package:flutter/material.dart';


class LogoutDialog {
  void _showDialog(BuildContext context) {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            backgroundColor: Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20.0),
            ),
            // title: Text("Logout"),
            content: Container(
              height: 86,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image.asset(
                    'assets/icon/7090891.png',
                    height: 45,
                  ),
                  const Text(
                    'Are you sure ?',
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 18,
                      color: Color.fromARGB(255, 167, 84, 78),
                    ),
                  ),
                  const Text(
                    'Do you want to logout',
                    style: TextStyle(color: Colors.black87),
                  ),
                ],
              ),
            ),
            actions: [
              Padding(
                padding: const EdgeInsets.only(right: 10, bottom: 10),
                child: TextButton(
                  onPressed: () async {
                    await AuthService().signOutGoogle();
                    // ignore: use_build_context_synchronously
                    Navigator.push(context,
                        MaterialPageRoute(builder: (context) => LoginScreen()));
                  },
                  child: const Text('Yes'),
                ),
              ),
            ],
          );
        });
  }
}