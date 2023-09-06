import 'package:flutter/material.dart';
import 'package:visitlog/Screens/job_card_screen.dart';
import 'package:visitlog/Screens/login_screen.dart';
import 'package:visitlog/Screens/profile_screen.dart';
import 'package:visitlog/screens/task_screen.dart';
import 'package:visitlog/services/auth_service.dart';

class DrawerWidget extends StatelessWidget {
  const DrawerWidget({
    super.key,
    required this.id,
  });

  final String id;

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Material(
        color: Colors.blueGrey[50],
        child: ListView(
          padding: const EdgeInsets.all(18),
          children: <Widget>[
            DrawerHeader(
              child: Center(
                child: Image.asset('assets/images/214940.png'),
              ),
            ),
            const SizedBox(height: 15),
            Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                buildMenuItem(
                  text: "Task List",
                  icon: Icons.task,
                  onClicked: () => selectedItem(context, 0),
                ),
                const SizedBox(height: 15),
                buildMenuItem(
                  text: "Job Cards",
                  icon: Icons.book,
                  onClicked: () => selectedItem(context, 1),
                ),
                const SizedBox(height: 15),
                buildMenuItem(
                  text: "View Profile",
                  icon: Icons.account_circle,
                  onClicked: () => selectedItem(context, 2),
                ),
                const SizedBox(height: 15),
                const Divider(),
                buildMenuItem(
                  text: "Log-Out",
                  icon: Icons.logout_rounded,
                  onClicked: () => selectedItem(context, 3),
                ),
                const SizedBox(
                  height: 50,
                )
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget buildMenuItem({
    required String text,
    required IconData icon,
    VoidCallback? onClicked,
  }) {
    return ListTile(
      leading: Icon(icon),
      title: Text(text, style: const TextStyle(fontSize: 17)),
      onTap: onClicked,
    );
  }

  Future<void> selectedItem(BuildContext context, int index) async {
    Navigator.of(context).pop();

    switch (index) {
      case 0:
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => TaskScreen()));

        break;
      case 1:
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => JobCard()));
        break;
      case 2:
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => Profile()));
        break;
      case 3:
        _showDialog(context);
        break;
    }
  }

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
      },
    );
  }
}
