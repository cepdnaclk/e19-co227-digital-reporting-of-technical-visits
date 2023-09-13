import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:visitlog/Components/drawer.dart';
import 'package:visitlog/Components/upper_bar.dart';
import 'package:visitlog/Widgets/job_list.dart';
import '../Widgets/bottom_navigation.dart';
import 'package:visitlog/Data/tasks.dart';

// ignore: must_be_immutable
class JobCard extends StatelessWidget {
  JobCard({super.key});
  static String id = "job_card_page";
  late String keyword;
  final List<Map<String, String>> items = TaskList().items;

  final GlobalKey<ScaffoldState> _globalKey = GlobalKey<ScaffoldState>();
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        key: _globalKey,
        drawer: DrawerWidget(id: id),
        bottomNavigationBar: NavBar(
          id: id,
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
                const Text(
                  "Sort",
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                SizedBox(
                  width: 1.0.w,
                ),
                Icon(Icons.arrow_drop_down_outlined),
                const Spacer(),
                Form(
                  child: Container(
                    width: 51.0.w,
                    height: 10.0.w,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(18),
                    ),
                    child: TextFormField(
                      style: TextStyle(color: Colors.black45),
                      onChanged: (value) {
                        keyword = value;
                      },
                      decoration: InputDecoration(
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16),
                        filled: true,
                        enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(18),
                                  borderSide: const BorderSide(
                                    color: Color.fromARGB(255, 221, 232, 250),
                                  )),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(18),
                                  borderSide: BorderSide(
                                    color: Color.fromARGB(255, 213, 226, 247),
                                  )
                        ),          
                        fillColor: Color.fromARGB(255, 221, 232, 250),
                        suffixIcon: const Padding(
                          padding: EdgeInsetsDirectional.only(start: 16, end: 16),
                          child: Icon(
                            Icons.search,
                            color: Colors.black38,
                          ),
                        ),
                        hintText: 'Search......',
                        hintStyle: TextStyle(color: Colors.black38),
                        
                      ),
                      textAlignVertical: TextAlignVertical.center,
                    ),
                  ),
                ),
                SizedBox(width: 10.0.w,)
              ],
            ),
            Expanded(
              child: 
                  ListView.builder(
                    itemCount: items.length,
                    itemBuilder: (context, index) {
                      return BuildItem(
                        index: index,
                      );
                    },
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
