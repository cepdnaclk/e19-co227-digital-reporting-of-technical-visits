import 'package:flutter/material.dart';
import 'package:hidden_drawer_menu/hidden_drawer_menu.dart';
import 'package:visitlog/Screens/task_screen.dart';

class HiddenDrawer extends StatefulWidget {
  const HiddenDrawer({super.key});
  static String id = 'hidden_drawer';

  @override
  State<HiddenDrawer> createState() => _HiddenDrawerState();
}

class _HiddenDrawerState extends State<HiddenDrawer> {
  List<ScreenHiddenDrawer> _pages = [];

  @override
  void initState() {
    super.initState();
    _pages = [
      ScreenHiddenDrawer(
        
          ItemHiddenMenu(
            name: "Task List",
            baseStyle: TextStyle(),
            selectedStyle: TextStyle(),
          ),
          TaskScreen()),
      ScreenHiddenDrawer(
          ItemHiddenMenu(
            name: "Job Cards",
            baseStyle: TextStyle(),
            selectedStyle: TextStyle(),
          ),
          TaskScreen()),
      ScreenHiddenDrawer(
          ItemHiddenMenu(
            name: "View Profile",
            baseStyle: TextStyle(),
            selectedStyle: TextStyle(),
          ),
          TaskScreen()),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return HiddenDrawerMenu(
      backgroundColorMenu: Colors.blueGrey,
      screens: _pages,
      initPositionSelected: 0,
    );
  }
}
