import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:visitlog/Screens/report_screen.dart';
import 'package:visitlog/Components/drawer.dart';
import 'package:visitlog/Widgets/bottom_navigation.dart';
import 'package:visitlog/Components/upper_bar.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class ArrivalConfirm extends StatefulWidget {
  final GlobalKey<ScaffoldState> globalKey = GlobalKey<ScaffoldState>();
  ArrivalConfirm({
    Key? key,
    required this.topic,
    required this.subTopic,
    required this.location,
    required this.description,
    required this.docId,
    required this.isArrived,
  }) : super(key: key);

  static String id = 'Arrival_screen';
  final String topic;
  final String subTopic;
  final String location;
  final String description;
  final String docId;
  bool isArrived;

  @override
  _ArrivalConfirmState createState() => _ArrivalConfirmState();
}

class _ArrivalConfirmState extends State<ArrivalConfirm> {
  bool isConfirmingArrival = false;

  // Inside your State class
  late StreamSubscription<DocumentSnapshot> _subscription;

  @override
  void initState() {
    super.initState();

    // Create a Firestore reference to your document
    final docReference =
        FirebaseFirestore.instance.collection('Tasks').doc(widget.docId);

    // Listen for changes to the document
    _subscription = docReference.snapshots().listen((docSnapshot) {
      if (docSnapshot.exists) {
        // Extract the updated value of isArrived from the document
        final updatedIsArrived = docSnapshot['isArrived'] ?? false;

        // Update the widget's state with the updated value
        setState(() {
          widget.isArrived = updatedIsArrived;
        });
      }
    });
  }

  @override
  void dispose() {
    // Cancel the Firestore listener when the widget is disposed
    _subscription?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (kDebugMode) {
      print("Build method called with isArrived: ${widget.isArrived}");
    }
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          key: widget.globalKey,
          drawer: DrawerWidget(id: ArrivalConfirm.id),
          bottomNavigationBar: NavBar(
            id: ArrivalConfirm.id,
            indexNum: 0,
          ),
          body: Column(
            children: [
              SizedBox(
                height: 6.0.h,
              ),
              UpperWidgetBar(globalKey: widget.globalKey),
              SizedBox(
                height: 13.0.h,
              ),
              (!widget.isArrived)
                  ? // Conditionally show if not arrived
                  Center(
                      child: Column(
                        children: [
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
                          isConfirmingArrival
                              ? const CircularProgressIndicator() // Show progress indicator
                              : TextButton(
                                  onPressed: () async {
                                    setState(() {
                                      isConfirmingArrival = true;
                                    });

                                    if (kDebugMode) {
                                      print("Arrived to the place");
                                    }

                                    final CollectionReference tasksCollection =
                                        FirebaseFirestore.instance
                                            .collection('Tasks');
                                    try {
                                      // Attempt to update Firestore document
                                      await tasksCollection
                                          .doc(widget.docId)
                                          .update({
                                        'isArrived': true,
                                      });

                                      // Show a success message or perform other actions
                                      // ignore: use_build_context_synchronously
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(
                                        SnackBar(
                                          content: const Text(
                                            'Arrival confirmed! 🎉',
                                            style: TextStyle(
                                              fontSize: 18,
                                              fontWeight: FontWeight.w500,
                                              color: Colors.green,
                                            ),
                                          ),
                                          backgroundColor: const Color.fromARGB(
                                                  255, 220, 247, 221)
                                              .withOpacity(0.1),
                                          shape: RoundedRectangleBorder(
                                            borderRadius:
                                                BorderRadius.circular(10),
                                          ),
                                          behavior: SnackBarBehavior.floating,
                                          elevation: 6.0,
                                          margin: EdgeInsets.all(10.0),
                                        ),
                                      );
                                    } catch (error) {
                                      // Handle any errors that occurred during the update operation
                                      print(
                                          'Error updating Firestore document: $error');

                                      // Update the state to indicate that the update failed
                                      setState(() {
                                        isConfirmingArrival =
                                            false; // Set it to false since the update failed
                                      });
                                    }

                                    // ignore: use_build_context_synchronously
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(
                                        content: const Text(
                                          'Arrival confirmed! 🎉',
                                          style: TextStyle(
                                            fontSize: 18,
                                            fontWeight: FontWeight.w500,
                                            color: Colors.green,
                                          ),
                                        ),
                                        backgroundColor: const Color.fromARGB(
                                                255, 220, 247, 221)
                                            .withOpacity(0.1),
                                        shape: RoundedRectangleBorder(
                                          borderRadius:
                                              BorderRadius.circular(10),
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
                                      gradient: const LinearGradient(
                                        begin: Alignment.topCenter,
                                        end: Alignment.bottomCenter,
                                        colors: [
                                          Color.fromARGB(255, 6, 59, 102),
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
                                    child: const Center(
                                      child: Padding(
                                        padding: EdgeInsets.all(10.0),
                                        child: Text(
                                          'Confirm Arrival',
                                          style: TextStyle(
                                            color: Color.fromARGB(
                                                255, 248, 248, 248),
                                            fontSize: 28,
                                            fontWeight: FontWeight.w900,
                                          ),
                                          textAlign: TextAlign.center,
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                        ],
                      ),
                    )
                  : // Conditionally show if arrived
                  Center(
                      child: Column(
                        children: [
                          SizedBox(
                            height: 12.0.h,
                          ),
                          const Text(
                            "Get in to your Report Here:",
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
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => ReportScreen(
                                      topic: widget.topic,
                                      subTopic: widget.subTopic,
                                      location: widget.location,
                                      description: widget.description,
                                      docId: widget.docId),
                                ),
                              );
                            },
                            child: Container(
                              width: 180,
                              height: 152,
                              decoration: BoxDecoration(
                                gradient: const LinearGradient(
                                  begin: Alignment.topCenter,
                                  end: Alignment.bottomCenter,
                                  colors: [
                                    Color.fromARGB(255, 6, 102, 49),
                                    Color.fromARGB(255, 91, 180, 139),
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
                              child: const Center(
                                child: Padding(
                                  padding: EdgeInsets.all(15.0),
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Text(
                                        'Continue To the Report',
                                        style: TextStyle(
                                          color: Color.fromARGB(
                                              255, 248, 248, 248),
                                          fontSize: 27,
                                          fontWeight: FontWeight.w900,
                                        ),
                                        textAlign: TextAlign.center,
                                      ),
                                      Text(
                                        '▶️',
                                        style: TextStyle(
                                          color: Color.fromARGB(
                                              255, 248, 248, 248),
                                          fontSize: 42,
                                          fontWeight: FontWeight.w900,
                                        ),
                                        textAlign: TextAlign.center,
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
            ],
          ),
        ));
  }
}
