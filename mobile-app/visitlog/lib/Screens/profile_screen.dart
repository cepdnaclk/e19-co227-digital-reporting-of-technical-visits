import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:visitlog/Components/drawer.dart';
import 'package:visitlog/Components/upper_bar.dart';
// import 'package:visitlog/Screens/hidden_drawer.dart';
// import 'package:visitlog/Screens/login_screen.dart';
// import 'package:visitlog/services/auth_service.dart';

class Profile extends StatelessWidget {
  Profile({super.key});
  static String id = "profile_page";

  final GlobalKey<ScaffoldState> _globalKey = GlobalKey<ScaffoldState>();
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        key: _globalKey,
        drawer: DrawerWidget(id: id),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            SizedBox(
              height: 5.0.h,
            ),
            UpperWidgetBar(globalKey: _globalKey),
            SizedBox(
              height: 9.0.h,
            ),
            const Text(
              "Your Profile",
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w700,
              ),
              textAlign: TextAlign.center,
            ),
            Divider(
              color: Colors.black54,
              thickness: 3,
              indent: 8.0.w,
              endIndent: 8.0.w,
            ),
            const Text(
              "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ",
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w700,
                color: Colors.redAccent
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
