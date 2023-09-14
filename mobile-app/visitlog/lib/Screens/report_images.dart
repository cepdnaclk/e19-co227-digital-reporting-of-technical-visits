import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:visitlog/Components/drawer.dart';
import 'package:visitlog/Components/upper_bar.dart';

class ReportImages extends StatelessWidget {
  ReportImages({super.key});
    static String id = "report_images";

  final GlobalKey<ScaffoldState> _globalKey = GlobalKey<ScaffoldState>();
  

    @override
    Widget build(BuildContext context) {
      return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
          key: _globalKey,
          drawer: DrawerWidget(id: id),
          //bottomNavigationBar: NavBar(id: id, indexNum: 0,),
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

              
            ]
          ),
        )
      );
    }
}