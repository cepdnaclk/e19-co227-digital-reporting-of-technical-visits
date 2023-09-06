import 'package:flutter/material.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:visitlog/Screens/job_card_screen.dart';
import 'package:visitlog/Screens/profile_screen.dart';
import 'package:visitlog/Screens/task_screen.dart';

// ignore: must_be_immutable
class NavBar extends StatelessWidget {
  NavBar({super.key, required this.id, required this.indexNum});

  final String id;
  int indexNum;

  @override
  Widget build(BuildContext context) {
    return CurvedNavigationBar(
      index: indexNum,
      height: 60,
      color: const Color.fromARGB(255, 190, 205, 212),
      backgroundColor: Colors.transparent,
      animationDuration: const Duration(milliseconds: 600),
      onTap: (index) {
        selectedItem(context, index);
      },
      items: const [
        Icon(Icons.task,size: 30,),
        Icon(Icons.book,size: 30,),
        Icon(Icons.account_circle,size: 30,),
      ],
    );
  }

  Future<void> selectedItem(BuildContext context, int index) async {
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
    }
  }
}
