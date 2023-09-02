import 'package:flutter/material.dart';

class TaskList extends StatelessWidget {
  TaskList({super.key});

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
  // Add more items as needed

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      scrollDirection: Axis.horizontal,
      itemCount: items.length,
      itemBuilder: (context, index) {
        return Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
          elevation: 3, // Adjust elevation as needed
          margin: EdgeInsets.all(4.0), // Add margin for spacing
          child: ListTile(
            title: Text(items[index]['name']!),
            subtitle: Text(items[index]['subTopic']!),
            trailing: IconButton(
              icon: Icon(Icons.arrow_forward),
              onPressed: () {
                _showDescriptionDialog(context, items[index]['description']!);
              },
            ),
            onTap: () {
              _showDescriptionDialog(context, items[index]['description']!);
            },
          ),
        );
      },
    );
  }

  void _showDescriptionDialog(BuildContext context, String description) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Description'),
          content: Text(description),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('Close'),
            ),
          ],
        );
      },
    );
  }
}
