import 'package:flutter/material.dart';

class SecondScreen extends StatelessWidget {
  const SecondScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Center(
          child: Center(
            child: Text(
              "Welcome to VisitLog",
              style: TextStyle(fontSize: 28),
              textAlign: TextAlign.center,
            ),
          ),
        ),
      ),
    );
  }
}