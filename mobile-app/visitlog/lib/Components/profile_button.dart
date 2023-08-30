import 'package:flutter/material.dart';
// import 'package:visitlog/Screens/hidden_drawer.dart';
import 'package:visitlog/services/auth_service.dart';

// ignore: must_be_immutable
class ProfileButton extends StatefulWidget {
  ProfileButton({
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
            onTap: () {
              setState(() {
                _expanded = !_expanded; // Toggle the expanded state
              });
            },
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: _expanded
                  ? [
                      CircleAvatar(
                        backgroundImage: Image.network(
                          userImage ?? '',
                          height: 40,
                          width: 40,
                        ).image,
                        maxRadius: 20,
                        minRadius: 15,
                      ),
                      const SizedBox(width: 12),
                      AnimatedOpacity(
                        duration: const Duration(milliseconds: 450),
                        opacity: _expanded
                            ? 1.0
                            : 0.0, // Control opacity based on expanded state
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
                                      fontSize: 10, color: Colors.black87),
                                ),
                              ],
                            );
                          },
                        ),
                      ),
                    ]
                  : [
                      CircleAvatar(
                        backgroundImage: Image.network(
                          userImage ?? '',
                          height: 50,
                          width: 50,
                        ).image,
                        maxRadius: 25,
                        minRadius: 20,
                      ),
                    ],
            ),
          ),
        ),
        const SizedBox(width: 20),
      ],
    );
  }
}
