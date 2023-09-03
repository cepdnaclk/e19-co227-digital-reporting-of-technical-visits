import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:visitlog/Components/profile_button.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

class UpperWidgetBar extends StatelessWidget {
  const UpperWidgetBar({
    super.key,
    required GlobalKey<ScaffoldState> globalKey,
  }) : _globalKey = globalKey;

  final GlobalKey<ScaffoldState> _globalKey;

  @override
  Widget build(BuildContext context) {
    return Row(mainAxisAlignment: MainAxisAlignment.center, children: [
      SizedBox(
        width: 6.0.w,
      ),
      Padding(
        padding: const EdgeInsets.all(8.0),
        child: FadeInLeft(
          delay: const Duration(seconds: 1),
          from: 100,
          duration: Duration(milliseconds: 300),
          child: GestureDetector(
            onTap: () {
              _globalKey.currentState?.openDrawer();
            },
            child: Image.asset(
              'assets/images/Logo1.png',
              height: MediaQuery.of(context).size.width / 6.5,
            ),
          ),
        ),
      ),
      const Spacer(),
      Padding(
        padding: EdgeInsets.only(bottom: 8),
        child: FadeInRight(
            from: 100,
            delay: Duration(seconds: 1),
            duration: Duration(milliseconds: 300),
            child: ProfileButton()),
      ),
    ]);
  }
}