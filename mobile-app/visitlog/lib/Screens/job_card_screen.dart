import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:visitlog/Components/drawer.dart';
import 'package:visitlog/Components/upper_bar.dart';
import 'package:visitlog/Widgets/job_list.dart';
import '../Widgets/bottom_navigation.dart';
import 'package:visitlog/Data/tasks.dart';
import 'package:visitlog/Widgets/search_bar.dart';
import 'package:visitlog/Widgets/sort_dropdown.dart';

// ignore: must_be_immutable
class JobCard extends StatefulWidget {
  JobCard({super.key});
  static String id = "job_card_page";

  @override
  State<JobCard> createState() => _JobCardState();
}

class _JobCardState extends State<JobCard> {
  String keyword = "";

  String sortCriteria = "DateTime";

  final List<Map<String, String>> items = TaskList().items;

  final GlobalKey<ScaffoldState> _globalKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        key: _globalKey,
        drawer: DrawerWidget(id: JobCard.id),
        bottomNavigationBar: NavBar(
          id: JobCard.id,
          indexNum: 1,
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
              "Job Cards",
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
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  width: 10.0.w,
                ),
                // const Text(
                //   "Sort",
                //   style: TextStyle(
                //     fontSize: 16,
                //     fontWeight: FontWeight.w400,
                //   ),
                // ),
                // SizedBox(
                //   width: 1.0.w,
                // ),
                // Icon(Icons.arrow_drop_down_outlined),

                SortDropdown(
                  onSelected: (value) {
                    setState(() {
                      sortCriteria = value;
                    });
                  },
                  sortOptions: const ['Company', 'Task', 'DateTime'],
                ),
                const Spacer(),
                SearchBarContainer(
                  onChanged: (value) {
                    setState(() {
                      keyword = value;
                    });
                  },
                ),
                SizedBox(
                  width: 10.0.w,
                )
              ],
            ),
            Expanded(
              child:
                  JobCardsList(searchWord: keyword, sortCriteria: sortCriteria),
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
