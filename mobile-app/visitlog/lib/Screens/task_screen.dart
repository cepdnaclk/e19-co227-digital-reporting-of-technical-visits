import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:visitlog/Components/drawer.dart';
// import 'package:visitlog/Components/task_list.dart';
import 'package:visitlog/Components/upper_bar.dart';

class TaskScreen extends StatefulWidget {
  TaskScreen({super.key});
  static String id = 'task_screen';

  @override
  State<TaskScreen> createState() => _TaskScreenState();
}

class _TaskScreenState extends State<TaskScreen> with TickerProviderStateMixin {
  final GlobalKey<ScaffoldState> _globalKey = GlobalKey<ScaffoldState>();

  final List<Map<String, String>> items = [
    {
      'name': 'Lanka Builders',
      'subTopic': 'Construction Site inspection',
      'description': 'Description for Item 1',
    },
    {
      'name': 'CoolAir Solutions',
      'subTopic': 'Air Conditioning Repair',
      'description': 'Description for Item 2',
    },
    {
      'name': 'MedTech Lanka',
      'subTopic': 'Medical Device Calibration',
      'description': 'Description for Item 3',
    },
  ];

  @override
  Widget build(BuildContext context) {
    TabController _tabController = TabController(length: 2, vsync: this);
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        key: _globalKey,
        drawer: DrawerWidget(id: TaskScreen.id),
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
              "Assigned Task List",
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
            SizedBox(
              height: 3.0.h,
            ),
            Row(
              children: [
                SizedBox(
                  width: 6.0.w,
                ),
                Container(
                  child: Align(
                    alignment: Alignment.centerLeft,
                    child: TabBar(
                      controller: _tabController,
                      isScrollable: true,
                      labelPadding: const EdgeInsets.only(left: 20, right: 20),
                      labelColor: const Color.fromARGB(255, 17, 84, 139),
                      labelStyle: const TextStyle(
                          fontWeight: FontWeight.w900,
                          fontSize: 18,
                          color: Color.fromARGB(255, 17, 84, 139),
                          shadows: <Shadow>[
                            Shadow(
                                offset: Offset(0.0, 2.0),
                                blurRadius: 4.0,
                                color: Color.fromARGB(255, 99, 109, 161))
                          ]),
                      unselectedLabelColor: Colors.black38,
                      unselectedLabelStyle: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: Colors.black38,
                          shadows: null),
                      indicatorSize: TabBarIndicatorSize.label,
                      indicatorColor: Colors.transparent,
                      tabs: const [
                        Tab(text: 'Today'),
                        Tab(text: 'Upcoming'),
                      ],
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(
              height: 1.0.h,
            ),
            Container(
              padding: const EdgeInsets.only(left: 30, right: 30),
              height: 70,
              width: double.maxFinite,
              child: TabBarView(
                controller: _tabController,
                children: [
                 SizedBox(
                    height: 32,
                    child: Card(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(15.0),
                        ),
                        elevation: 3, // Adjust elevation as needed
                        margin: EdgeInsets.all(4.0), // Add margin for spacing
                        child: ListTile(
                          visualDensity:
                              VisualDensity(horizontal: 0, vertical: -4),
                          title: Text('Lanka Builders'),
                          subtitle: Text('Construction Site inspection'),
                          trailing: IconButton(
                            icon: Icon(Icons.arrow_forward),
                            onPressed: () {
                              _showDescriptionDialog(
                                  context, 'Description for Item 1');
                            },
                          ),
                          onTap: () {
                            _showDescriptionDialog(
                                context, 'Description for Item 1');
                          },
                        )),
                  ),
                  SizedBox(
                    height: 32,
                    child: Card(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(15.0),
                        ),
                        elevation: 3, // Adjust elevation as needed
                        margin: EdgeInsets.all(4.0), // Add margin for spacing
                        child: ListTile(
                          visualDensity:
                              VisualDensity(horizontal: 0, vertical: -4),
                          title: Text('Lanka Builders'),
                          subtitle: Text('Construction Site inspection'),
                          trailing: IconButton(
                            icon: Icon(Icons.arrow_forward),
                            onPressed: () {
                              _showDescriptionDialog(
                                  context, 'Description for Item 1');
                            },
                          ),
                          onTap: () {
                            _showDescriptionDialog(
                                context, 'Description for Item 1');
                          },
                        )),
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }

  // Widget buildList() {
  //   return ListView.builder(
  //     scrollDirection: Axis.horizontal,
  //     itemCount: items.length,
  //     itemBuilder: (context, index) {
  //       return Card(
  //         shape: RoundedRectangleBorder(
  //           borderRadius: BorderRadius.circular(10.0),
  //         ),
  //         elevation: 3, // Adjust elevation as needed
  //         margin: EdgeInsets.all(4.0), // Add margin for spacing
  //         child: ListTile(
  //           title: Text(items[index]['name'] ?? ''),
  //           subtitle: Text(items[index]['subTopic'] ?? ''),
  //           trailing: IconButton(
  //             icon: Icon(Icons.arrow_forward),
  //             onPressed: () {
  //               _showDescriptionDialog(
  //                   context, items[index]['description'] ?? '');
  //             },
  //           ),
  //           onTap: () {
  //             _showDescriptionDialog(context, items[index]['description']!);
  //           },
  //         ),
  //       );
  //     },
  //   );
  // }

  void _showDescriptionDialog(BuildContext context, String description) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text(
            'Description',
            style: TextStyle(color: Colors.black54),
          ),
          content: Text(
            description,
            style: TextStyle(color: Colors.black54),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text(
                'Close',
                style: TextStyle(color: Colors.black45),
              ),
            ),
          ],
          backgroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
        );
      },
    );
  }
}
