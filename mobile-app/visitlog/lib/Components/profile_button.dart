import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:visitlog/Screens/login_screen.dart';
import 'package:visitlog/services/auth_service.dart';

// ignore: must_be_immutable
class ProfileButton extends StatefulWidget {
  const ProfileButton({
    super.key,
  });

  @override
  State<ProfileButton> createState() => _ProfileButtonState();
}

class _ProfileButtonState extends State<ProfileButton> {
  String? userImage = AuthService().getUserImage();
  // ignore: non_constant_identifier_names
  String? UserName = AuthService().getUserName();
  // ignore: non_constant_identifier_names
  String? UserEmail = AuthService().getUserEmail();

  bool _expanded = false;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        AnimatedContainer(
          duration: const Duration(
              milliseconds: 385), // Use milliseconds instead of microseconds
          curve: Curves.linear,
          width:
              _expanded ? 210 : 65, // Adjust width based on the expanded state
          height:
              _expanded ? 50 : 50, // Adjust height based on the expanded state
          child: GestureDetector(
            onDoubleTap: () {
              _showDialog();
            },
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: _expanded
                  ? [
                      GestureDetector(
                        onTap: () {
                          setState(() {
                            _expanded = !_expanded; // Toggle the expanded state
                          });
                        },
                        child: CircleAvatar(
                          backgroundImage: Image.network(
                            userImage ?? '',
                            height: 40,
                            width: 40,
                          ).image,
                          maxRadius: 20,
                          minRadius: 15,
                        ),
                      ),
                      const SizedBox(width: 12),
                      AnimatedOpacity(
                        duration: const Duration(milliseconds: 450),
                        opacity: _expanded
                            ? 1.0
                            : 0.0, // Control opacity based on expanded state
                        child: GestureDetector(
                          onTap: () {
                            _showDialog();
                          },
                          child: FutureBuilder(
                            future: Future.delayed(
                              const Duration(
                                  milliseconds:
                                      380), // Delay the appearance of the Column
                              () => true,
                            ),
                            builder: (context, snapshot) {
                              if (snapshot.connectionState ==
                                      ConnectionState.waiting ||
                                  !snapshot.hasData) {
                                return Container(); // Return an empty container while waiting
                              }
                              return Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    UserName ?? '',
                                    style: const TextStyle(
                                        fontSize: 14, color: Colors.black87),
                                  ),
                                  Text(
                                    UserEmail ?? '',
                                    style: const TextStyle(
                                        fontSize: 10, color: Colors.black54),
                                  ),
                                ],
                              );
                            },
                          ),
                        ),
                      ),
                    ]
                  : [
                      GestureDetector(
                        onTap: () {
                          setState(() {
                            _expanded = !_expanded; // Toggle the expanded state
                          });
                        },
                        child: CircleAvatar(
                          backgroundImage: Image.network(
                            userImage ?? '',
                            height: 50,
                            width: 50,
                          ).image,
                          maxRadius: 25,
                          minRadius: 20,
                        ),
                      ),
                    ],
            ),
          ),
        ),
        SizedBox(width: 6.0.w),
      ],
    );
  }

  void _showDialog() {
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
                child: const Text(
                  'Yes',
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                    fontSize: 18,
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}
