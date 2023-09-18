import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:visitlog/Components/drawer.dart';
import 'package:visitlog/Components/upper_bar.dart';
import 'package:visitlog/Widgets/bottom_navigation.dart';
import 'package:visitlog/Widgets/today_tasks.dart';
import 'package:visitlog/Widgets/upcomming_tasks.dart';

class TaskScreen extends StatefulWidget {
  const TaskScreen({super.key});
  static String id = 'task_screen';

  @override
  State<TaskScreen> createState() => _TaskScreenState();
}

class _TaskScreenState extends State<TaskScreen> with TickerProviderStateMixin {
  final GlobalKey<ScaffoldState> _globalKey = GlobalKey<ScaffoldState>();
  static String id = 'task_screen';

  @override
  Widget build(BuildContext context) {
    TabController tabController = TabController(length: 2, vsync: this);
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        key: _globalKey,
        drawer: DrawerWidget(id: TaskScreen.id),
        bottomNavigationBar: NavBar(
          id: id,
          indexNum: 0,
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            SizedBox(
              height: 6.0.h,
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
                      controller: tabController,
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
            Expanded(
              child: TabBarView(
                controller: tabController,
                children: [
                  // FirestoreListView(
                  //     ),

                  TodayTaskBuildItem(),

                  UpcommingTaskBuildItem(),
                ],
              ),
            ),
            SizedBox(
              height: 6.0.h,
            )
          ],
        ),
      ),
    );
  }
}
