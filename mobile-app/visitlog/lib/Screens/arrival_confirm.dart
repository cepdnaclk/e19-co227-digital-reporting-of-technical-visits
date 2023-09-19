import 'package:flutter/material.dart';
import 'package:visitlog/Screens/report_screen.dart';
import 'package:visitlog/Components/drawer.dart';
import 'package:visitlog/Widgets/bottom_navigation.dart';
import 'package:visitlog/Components/upper_bar.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class ArrivalConfirm extends StatelessWidget {
  final GlobalKey<ScaffoldState> _globalKey = GlobalKey<ScaffoldState>();
  ArrivalConfirm({
    super.key,
    required this.topic,
    required this.subTopic,
    required this.location,
    required this.description,
    required this.docId,
  });
  static String id = 'Arrival_screen';
  final String topic;
  final String subTopic;
  final String location;
  final String description;
  final String docId;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        key: _globalKey,
        drawer: DrawerWidget(id: ArrivalConfirm.id),
        bottomNavigationBar: NavBar(
          id: id,
          indexNum: 0,
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(
                height: 6.0.h,
              ),
              UpperWidgetBar(globalKey: _globalKey),
              SizedBox(
                height: 13.0.h,
              ),
              const Text(
                "Confirm your Arrival Here:",
                style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w700,
                    color: Colors.black87),
                textAlign: TextAlign.center,
              ),
              SizedBox(
                height: 2.0.h,
              ),
              TextButton(
                onPressed: () async {
                  print("Arrived to the place");

                  final CollectionReference tasksCollection =
                      FirebaseFirestore.instance.collection('Tasks');
                  await tasksCollection.doc(docId).update({
                    'isArrived': true,
                  });

                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text(
                        'Arrival confirmed! 🎉',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w500,
                          color: Colors.green,
                        ),
                      ),
                      backgroundColor: const Color.fromARGB(255, 220, 247, 221)
                          .withOpacity(0.1),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      behavior: SnackBarBehavior.floating,
                      elevation: 6.0,
                      margin: EdgeInsets.all(10.0),
                    ),
                  );
                },
                child: Container(
                  width: 180,
                  height: 140,
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        const Color.fromARGB(255, 6, 59, 102),
                        Color.fromARGB(255, 52, 123, 151),
                      ],
                    ),
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.5),
                        spreadRadius: 5,
                        blurRadius: 7,
                        offset: Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Center(
                    child: Padding(
                      padding: const EdgeInsets.all(10.0),
                      child: Text(
                        'Confirm Arrival',
                        style: TextStyle(
                          color: Color.fromARGB(255, 248, 248, 248),
                          fontSize: 28,
                          fontWeight: FontWeight.w900,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                ),
              ),
              SizedBox(
                height: 12.0.h,
              ),
              // Elevated button
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    ElevatedButton(
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => ReportScreen(
                                    topic: topic,
                                    subTopic: subTopic,
                                    location: location,
                                    description: description,
                                    docId: docId)));
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Color.fromARGB(255, 233, 243, 248),
                        shape: const StadiumBorder(),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(12.0),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            const Text(
                              'Continue to the Report',
                              style: TextStyle(
                                  fontSize: 18, color: Colors.black87),
                            ),
                            SizedBox(width: 1.0.w),
                            const Icon(
                              Icons.arrow_forward,
                              color: Colors.black87,
                            )
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
