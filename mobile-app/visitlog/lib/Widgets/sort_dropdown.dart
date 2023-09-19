import 'package:flutter/material.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

class SortDropdown extends StatefulWidget {
  final Function(String) onSelected;
  final List<String> sortOptions;

  const SortDropdown({super.key, required this.onSelected, required this.sortOptions});

  @override
  _SortDropdownState createState() => _SortDropdownState();
}

class _SortDropdownState extends State<SortDropdown> {
  String selectedSortOption = 'DateTime';

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 25.0.w,
      child: DropdownButton<String>(
        value: selectedSortOption,
        icon: const Icon(Icons.arrow_drop_down_outlined),
        items: widget.sortOptions.map((sortOption) {
          return DropdownMenuItem<String>(
            value: sortOption,
            
            child: Text(sortOption),
          );
        }).toList(),
        onChanged: (value) {
          setState(() {
            selectedSortOption = value!;
          });
          widget.onSelected(value!);
        },
        focusColor: Colors.transparent,
      ),
    );
  }
}

