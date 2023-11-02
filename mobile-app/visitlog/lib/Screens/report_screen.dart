import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:visitlog/Components/drawer.dart';
import 'package:visitlog/Components/upper_bar.dart';
import 'package:visitlog/Screens/report_images.dart';
import 'package:visitlog/Data/tasks.dart';
import 'package:intl/intl.dart';
import 'package:visitlog/services/auth_service.dart';
import 'package:visitlog/utils.dart';

class ReportScreen extends StatefulWidget {
  const ReportScreen(
      {super.key,
      required this.topic,
      required this.subTopic,
      required this.location,
      required this.description,
      required this.docId});
  static const String id = "report_screen";

  final String topic;
  final String subTopic;
  final String location;
  final String description;
  final String docId;

  @override
  // ignore: library_private_types_in_public_api
  _ReportScreenState createState() => _ReportScreenState();
}

class _ReportScreenState extends State<ReportScreen> {
  late String representative = '-';
  late String type = '-';
  late String notes = '-';
  final List<Uint8List> _images = [];

  final GlobalKey<ScaffoldState> _globalKey = GlobalKey<ScaffoldState>();
  final _formkey = GlobalKey<FormState>();
  final TextEditingController _textController = TextEditingController();
  final List<Map<String, String>> items = TaskList().items;
  // ignore: non_constant_identifier_names
  String? UserName = AuthService().getUserName();
  String cdate = DateFormat("yyyy-MM-dd").format(DateTime.now());

  void selectImage() async {
    Uint8List img = await pickImage(ImageSource.gallery);
    setState(() {
      _images.add(img);
    });
  }

  @override
  Widget build(BuildContext context) {
    // String representative = '-';
    // String type = '-';
    // String notes = '-';
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        key: _globalKey,
        drawer: DrawerWidget(id: ReportScreen.id),
        body: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(
                height: 5.0.h,
              ),
              UpperWidgetBar(globalKey: _globalKey),
              const Text(
                "",
                style: TextStyle(
                  fontSize: 22,
                  fontWeight: FontWeight.w700,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 10),
              Padding(
                padding: EdgeInsets.symmetric(
                  horizontal: MediaQuery.of(context).size.width / 15,
                ),
                child: Card(
                  elevation: 3,
                  shadowColor: Color.fromARGB(255, 77, 77, 77),
                  color: Color(0xFFE6F1F9),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    children: [
                      const SizedBox(height: 12),
                      Center(
                        child: Text(
                          widget.topic,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 20,
                          ),
                        ),
                      ),
                      Center(
                        child: Text(
                          widget.subTopic,
                          style: const TextStyle(
                            fontWeight: FontWeight.w700,
                            color: Color(0xFF194C9F),
                            fontSize: 16,
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),
                    ],
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.symmetric(
                  vertical: MediaQuery.of(context).size.height / 25,
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
                  child: SingleChildScrollView(
                    child: Form(
                      key: _formkey,
                      child: Padding(
                        padding: EdgeInsets.symmetric(
                          vertical: MediaQuery.of(context).size.height / 20,
                          horizontal: MediaQuery.of(context).size.width / 15,
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Inspection Date',
                              style: TextStyle(
                                color: Colors.grey,
                                fontSize: 15,
                                fontWeight: FontWeight.normal,
                              ),
                            ),
                            Text(
                              cdate,
                              style: const TextStyle(
                                fontWeight: FontWeight.w600,
                                color: Colors.black87,
                              ),
                            ),
                            Divider(
                              color: const Color.fromARGB(137, 163, 163, 163),
                              thickness: 2,
                              indent: 0,
                              endIndent: 0,
                            ),
                            SizedBox(height: 1),
                            const Text(
                              'Technical Officer',
                              style: TextStyle(
                                color: Colors.grey,
                                fontSize: 15,
                                fontWeight: FontWeight.normal,
                              ),
                            ),
                            Text(
                              UserName ?? '',
                              style: const TextStyle(
                                fontWeight: FontWeight.w600,
                                color: Colors.black87,
                              ),
                            ),
                            Divider(
                              color: const Color.fromARGB(137, 163, 163, 163),
                              thickness: 2,
                              indent: 0,
                              endIndent: 0,
                            ),
                            SizedBox(height: 1),
                            const Text(
                              'Address',
                              style: TextStyle(
                                color: Colors.grey,
                                fontSize: 15,
                                fontWeight: FontWeight.normal,
                              ),
                            ),
                            Text(
                              widget.location,
                              style: const TextStyle(
                                fontWeight: FontWeight.w600,
                                color: Colors.black87,
                              ),
                            ),
                            Divider(
                              color: const Color.fromARGB(137, 163, 163, 163),
                              thickness: 2,
                              indent: 0,
                              endIndent: 0,
                            ),
                            SizedBox(height: 1),
                            const Text(
                              'Site Representative',
                              style: TextStyle(
                                color: Colors.grey,
                                fontSize: 15,
                                fontWeight: FontWeight.normal,
                              ),
                            ),
                            TextFormField(
                              style: const TextStyle(color: Colors.black),
                              onChanged: (value) {
                                setState(() {
                                  representative = value;
                                });
                              },
                              decoration: InputDecoration(
                                isDense: true, // important line
                                contentPadding:
                                    EdgeInsets.fromLTRB(0, 10, 0, 10),
                              ),
                            ),
                            SizedBox(height: 10),
                            const Text(
                              'Type of work',
                              style: TextStyle(
                                color: Colors.grey,
                                fontSize: 15,
                                fontWeight: FontWeight.normal,
                              ),
                            ),
                            TextFormField(
                              style: const TextStyle(color: Colors.black),
                              onChanged: (value) {
                                setState(() {
                                  type = value;
                                });
                              },
                              decoration: InputDecoration(
                                isDense: true,
                                contentPadding:
                                    EdgeInsets.fromLTRB(0, 10, 0, 10),
                              ),
                            ),
                            const SizedBox(height: 10),
                            const Text(
                              'Notes',
                              style: TextStyle(
                                color: Colors.grey,
                                fontSize: 15,
                                fontWeight: FontWeight.normal,
                              ),
                            ),
                            const SizedBox(height: 10),
                            Column(
                              children: <Widget>[
                                TextFormField(
                                  style: const TextStyle(color: Colors.black),
                                  onChanged: (value) {
                                    setState(() {
                                      notes = value;
                                    });
                                  },
                                  controller: _textController,
                                  maxLines: 4,
                                  minLines: 4,
                                  decoration: const InputDecoration(
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.all(
                                        Radius.circular(6.0),
                                      ),
                                    ),
                                  ),
                                ),
                                const SizedBox(height: 10),
                                Card(
                                  elevation: 0,
                                  color: Color.fromARGB(255, 255, 255, 255),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(7),
                                  ),
                                  child: Center(
                                    child: Column(
                                      children: [
                                        InkWell(
                                          onTap: selectImage,
                                          child: Ink.image(
                                            image: const AssetImage(
                                                'assets/icon/AddIcon.png'),
                                            height: 80,
                                            width: 80,
                                          ),
                                        ),
                                        const Text(
                                          'Add Images',
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 18,
                                            color: Color(0xFFC8C8C9),
                                          ),
                                        ),
                                        const SizedBox(height: 8),
                                        Container(
                                          height: 100.0,
                                          child: Wrap(
                                            spacing: 8.0,
                                            children: _images
                                                .asMap()
                                                .entries
                                                .map((entry) {
                                              final int index = entry.key;
                                              final Uint8List image =
                                                  entry.value;
                                              return Stack(
                                                children: [
                                                  Image.memory(
                                                    image,
                                                    height: 100,
                                                    width: 100,
                                                  ),
                                                  Positioned(
                                                    top: 0,
                                                    right: 0,
                                                    child: InkWell(
                                                      onTap: () {
                                                        setState(() {
                                                          _images
                                                              .removeAt(index);
                                                        });
                                                      },
                                                      child: Container(
                                                        decoration:
                                                            BoxDecoration(
                                                          shape:
                                                              BoxShape.circle,
                                                          color: const Color.fromARGB(255, 245, 225, 225),
                                                        ),
                                                        padding:
                                                            EdgeInsets.all(4),
                                                        child: Icon(
                                                          Icons.close,
                                                          size: 20,
                                                          color: Colors.red,
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ],
                                              );
                                            }).toList(),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                )
                              ],
                            )
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                  left: 20.0,
                  right: 20.0,
                  bottom: 20.0,
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    ElevatedButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => ReportImages(
                                  topic: widget.topic,
                                  subTopic: widget.subTopic,
                                  date: cdate,
                                  address: widget.location,
                                  representative: representative,
                                  type: type,
                                  notes: notes,
                                  images: _images,
                                  docId: widget.docId)),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        shape: const StadiumBorder(),
                        backgroundColor: Color(0xFF082A63),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          const Text(
                            'Continue',
                            style: TextStyle(fontSize: 15),
                          ),
                          SizedBox(width: 1.0.w),
                          const Icon(Icons.arrow_forward_rounded)
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(
                height: 8,
              )
            ],
          ),
        ),
      ),
    );
  }
}
