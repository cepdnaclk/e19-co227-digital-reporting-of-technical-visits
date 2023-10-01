import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:visitlog/Components/drawer.dart';
import 'package:visitlog/Components/upper_bar.dart';
import 'package:visitlog/Data/tasks.dart';
import 'package:visitlog/services/auth_service.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class ReportImages extends StatelessWidget {
  ReportImages({
    Key? key,
    required this.topic,
    required this.subTopic,
    required this.date,
    required this.address,
    required this.representative,
    required this.type,
    required this.notes,
    required this.images,
    required this.docId,
  }) : super(key: key);

  static String id = "report_images";

  final String topic;
  final String subTopic;
  final String date;
  final String address;
  final String representative;
  final String type;
  final String notes;
  final List<Uint8List> images;
  final String docId;

  final GlobalKey<ScaffoldState> _globalKey = GlobalKey<ScaffoldState>();
  String? UserName = AuthService().getUserName();

  @override
  Widget build(BuildContext context) {
    final String localTopic = topic;
    final String localsubTopic = subTopic;
    final String localDate = date;
    final String localAddress = address;

    List<TableRow> tableRows = [
      buildTableRow('Company', localTopic),
      buildTableRow('Visit Type', localsubTopic),
      buildTableRow('Inspection Date', localDate),
      buildTableRow('Technical Officer', UserName ?? ''),
      buildTableRow('Address', localAddress),
      buildTableRow('Site Representative', representative),
      buildTableRow('Type of Work', type),
      buildTableRow('Notes', notes),
    ];

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        key: _globalKey,
        drawer: DrawerWidget(id: id),
        body: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(
                height: 6.0.h,
              ),
              UpperWidgetBar(globalKey: _globalKey),
              Padding(
                padding: EdgeInsets.symmetric(
                  vertical: MediaQuery.of(context).size.height / 20,
                  horizontal: MediaQuery.of(context).size.width / 15,
                ),
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(18),
                    boxShadow: const [
                      BoxShadow(
                        color: Color.fromARGB(255, 216, 216, 216),
                        offset: Offset(
                          5.0,
                          5.0,
                        ),
                        blurRadius: 10.0,
                        spreadRadius: 2.0,
                      ),
                      BoxShadow(
                        color: Colors.white,
                        offset: Offset(0.0, 0.0),
                        blurRadius: 0.0,
                        spreadRadius: 0.0,
                      ),
                    ],
                  ),
                  child: Padding(
                    padding: EdgeInsets.symmetric(
                      vertical: MediaQuery.of(context).size.height / 28,
                      horizontal: MediaQuery.of(context).size.width / 18,
                    ),
                    child: Column(
                      children: [
                        Text(
                          "COMPANY NAME",
                          style: TextStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.w700,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        SizedBox(height: 20),
                        Table(
                          columnWidths: {
                            0: FlexColumnWidth(1),
                            1: FlexColumnWidth(2),
                          },
                          children: tableRows,
                        ),
                        SizedBox(height: 20),
                        if (images != null)
                          Wrap(
                            spacing: 8.0,
                            children: images.map((image) {
                              return Image.memory(
                                image,
                                height: 100,
                                width: 100,
                              );
                            }).toList(),
                          ),
                      ],
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    ElevatedButton(
                      onPressed: () async {
                        final CollectionReference tasksCollection =
                            FirebaseFirestore.instance.collection('Tasks');
                        await tasksCollection.doc(docId).update({
                          'isCompleted': true,
                        });
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
                              'SUBMIT',
                              style: TextStyle(
                                fontSize: 18,
                                color: Colors.black87,
                              ),
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

  TableRow buildTableRow(String label, String value) {
    return TableRow(
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: Color(0xFFC8C8C9),
            width: 1,
          ),
        ),
      ),
      children: [
        TableCell(
          child: Padding(
            padding: EdgeInsets.symmetric(vertical: 8),
            child: Text(
              label,
              style: TextStyle(
                color: Color(0xFF757575),
                fontSize: 12,
                fontWeight: FontWeight.normal,
              ),
            ),
          ),
        ),
        TableCell(
          child: Padding(
            padding: EdgeInsets.symmetric(vertical: 8),
            child: Text(
              value,
              style: const TextStyle(
                fontWeight: FontWeight.w600,
                color: Colors.black87,
                fontSize: 12,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
