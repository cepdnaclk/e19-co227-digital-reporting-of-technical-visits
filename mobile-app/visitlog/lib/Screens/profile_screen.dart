import 'package:get/get.dart';
import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:animate_do/animate_do.dart';
import 'package:visitlog/Components/drawer.dart';
import 'package:visitlog/Widgets/bottom_navigation.dart';
import 'package:visitlog/services/auth_service.dart';
import 'package:visitlog/Controllers/task_controller.dart';


// ignore: must_be_immutable
class Profile extends StatelessWidget {
  Profile({super.key});
  static String id = "profile_page";

  // ignore: non_constant_identifier_names
  String? UserName = AuthService().getUserName();
  // ignore: non_constant_identifier_names
  String? UserEmail = AuthService().getUserEmail();

  final GlobalKey<ScaffoldState> _globalKey = GlobalKey<ScaffoldState>();
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        key: _globalKey,
        drawer: DrawerWidget(id: id),
        bottomNavigationBar: NavBar(id: id, indexNum: 2,),
        body: Column(
          children: [
            Expanded(flex: 2, child: _TopPortion(globalKey: _globalKey)),
            Expanded(
              flex: 3,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  children: [
                    Text(
                      UserName ?? '',
                      style: Theme.of(context)
                          .textTheme
                          .headlineSmall
                          ?.copyWith(fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 5),
                    Text(
                      UserEmail ?? '',
                      style: Theme.of(context)
                          .textTheme
                          .titleMedium
                          ?.copyWith(fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 16),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                SizedBox(
                                  width: 120,
                                  height: 3,
                                  child: Divider(
                                  color: Colors.black38,
                                  thickness: 1,
                                ),
                                ),
                                Padding(
                                  padding: EdgeInsets.all(10.0),
                                  child: Text(
                                    'Task counts',
                                    style: TextStyle(
                                      color: Colors.black45,
                                      fontSize: 16,
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                ),
                                SizedBox(
                                  width: 120,
                                  height: 3,
                                    child: Divider(
                                  color: Colors.black38,
                                  thickness: 1,
                                )),
                              ],
                            ),
                    _ProfileInfoRow()
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}


// ignore: must_be_immutable
class _ProfileInfoRow extends StatelessWidget {
  _ProfileInfoRow({Key? key}) : super(key: key);

  String? userImage = AuthService().getUserImage();

  final List<ProfileInfoItem> _items = [
    ProfileInfoItem("Completed", Get.put(TaskController()).jobs.length, Colors.green),
    ProfileInfoItem("On-Going", Get.put(TaskController()).taskItems.length + Get.put(TaskController()).upcommingTasks.length, Colors.blue),
    const ProfileInfoItem("Missed", 0, Colors.red),
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 80,
      constraints: const BoxConstraints(maxWidth: 400),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: _items
            .map((item) => Expanded(
                    child: Row(
                  children: [
                    if (_items.indexOf(item) != 0) const VerticalDivider(),
                    Expanded(child: _singleItem(context, item)),
                  ],
                )))
            .toList(),
      ),
    );
  }

  Widget _singleItem(BuildContext context, ProfileInfoItem item) => Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              item.value.toString(),
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 20,
                color: item.color,
              ),
            ),
          ),
          Text(
            item.title,
            style: Theme.of(context).textTheme.bodySmall,
          )
        ],
      );
}

class ProfileInfoItem {
  final String title;
  final int value;
  final Color color;
  const ProfileInfoItem(this.title, this.value, this.color);
}

// ignore: must_be_immutable
class _TopPortion extends StatelessWidget {
  _TopPortion({
    required GlobalKey<ScaffoldState> globalKey,
  }) : _globalKey = globalKey;

  final GlobalKey<ScaffoldState> _globalKey;

  String? userImage = AuthService().getUserImage();

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: [
        Container(
          margin: const EdgeInsets.only(bottom: 50),
          decoration: const BoxDecoration(
              gradient: LinearGradient(
                  begin: Alignment.bottomCenter,
                  end: Alignment.topCenter,
                  colors: [
                    Color.fromARGB(255, 80, 120, 139),
                    Color.fromARGB(255, 255, 255, 255)
                  ]),
              borderRadius: BorderRadius.only(
                bottomLeft: Radius.circular(50),
                bottomRight: Radius.circular(50),
              )),
        ),
        Align(
          alignment: Alignment.bottomCenter,
          child: SizedBox(
            width: 150,
            height: 150,
            child: Stack(
              fit: StackFit.expand,
              children: [
                CircleAvatar(
                  backgroundImage: Image.network(
                    userImage ?? '',
                    height: 40,
                    width: 40,
                  ).image,
                  maxRadius: 20,
                  minRadius: 15,
                ),
                Positioned(
                  bottom: 0,
                  right: 0,
                  child: CircleAvatar(
                    radius: 20,
                    backgroundColor: Theme.of(context).scaffoldBackgroundColor,
                    child: Container(
                      margin: const EdgeInsets.all(8.0),
                      decoration: const BoxDecoration(
                          color: Colors.green, shape: BoxShape.circle),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
        Align(
          alignment: Alignment.topLeft,
          child: Column(
            children: [
              SizedBox(
                height: 6.0.h,
              ),
              Row(mainAxisAlignment: MainAxisAlignment.start, children: [
                SizedBox(
                  width: 4.0.w,
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: FadeInLeft(
                    delay: const Duration(seconds: 1),
                    from: 100,
                    duration: Duration(milliseconds: 500),
                    child: GestureDetector(
                      onTap: () {
                        _globalKey.currentState?.openDrawer();
                      },
                      child: Image.asset(
                        'assets/images/Logo1.png',
                        height: MediaQuery.of(context).size.height / 14.5,
                      ),
                    ),
                  ),
                ),
              ]),
            ],
          ),
        )
      ],
    );
  }
}
