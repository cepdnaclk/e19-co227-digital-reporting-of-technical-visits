import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

class SearchBarContainer extends StatelessWidget {
  final Function(String) onChanged;

  const SearchBarContainer({super.key, required this.onChanged});

  @override
  Widget build(BuildContext context) {
    return Form(
      child: Container(
        width: 45.0.w,
        height: 10.0.w,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(18),
        ),
        child: TextFormField(
          style: TextStyle(color: Colors.black45),
          onChanged: onChanged,
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
                )),
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
    );
  }
}
