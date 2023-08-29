import 'package:flutter/material.dart';
// import 'package:visitlog/Screens/hidden_drawer.dart';
import 'package:visitlog/services/auth_service.dart';

// ignore: must_be_immutable
class AppBarRow extends StatelessWidget {
  AppBarRow({
    super.key,
  });

  String? userImage = AuthService().getUserImage();
  // ignore: non_constant_identifier_names
  String? UserName = AuthService().getUserName();
  // ignore: non_constant_identifier_names
  String? UserEmail = AuthService().getUserEmail();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
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
                        style: TextStyle(fontSize: 12,color: Colors.black87),
                      ),
                      Text(
                        UserEmail ?? '',
                        style: TextStyle(fontSize: 10, color: Colors.black87),
                      )
                    ],
                  )
                ]),
          ],
        ),
        const SizedBox(width: 35),
        // Column(
        //   children: [
        //     const SizedBox(height: 8),
        //     IconButton(
        //         onPressed: () {
        //           Navigator.pushNamed(context, HiddenDrawer.id);
        //         },
        //         icon: Icon(Icons.menu)),
        //   ],
        // )
      ],
    );
  }
}
