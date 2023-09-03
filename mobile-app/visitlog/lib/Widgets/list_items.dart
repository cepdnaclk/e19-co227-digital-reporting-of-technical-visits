import 'package:flutter/material.dart';
import 'package:visitlog/Data/tasks.dart';

class BuildItem extends StatelessWidget {
  BuildItem({super.key, required this.index});
  final List<Map<String, String>> items = TaskList().items;
  final int index;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 30, right: 30, bottom: 10),
      child: SizedBox(
        height: 75,
        child: Card(
          color: const Color.fromARGB(220, 34, 39, 41),
          shadowColor: const Color.fromARGB(220, 50, 152, 192),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20.0),
          ),
          elevation: 10, // Adjust elevation as needed
          margin: const EdgeInsets.all(4.0), // Add margin for spacing
          child: Padding(
            padding: const EdgeInsets.only(left: 8),
            child: ListTile(
              leading: const Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.work, color: Colors.white),
                ],
              ),
              title: Text(
                items[index]['name'] ?? '',
                style: const TextStyle(color: Colors.white70),
              ),
              subtitle: Text(
                items[index]['subTopic'] ?? '',
                style:
                    const TextStyle(color: Color.fromARGB(255, 185, 227, 247)),
              ),
              trailing: IconButton(
                icon: const Icon(
                  Icons.arrow_forward,
                  color: Colors.white,
                ),
                onPressed: () {
                  _showDescriptionDialog(
                      context,
                      items[index]['description'] ?? '',
                      items[index]['name'] ?? '',
                      items[index]['subTopic'] ?? '');
                },
              ),
              onTap: () {
                _showDescriptionDialog(
                    context,
                    items[index]['description'] ?? '',
                    items[index]['name'] ?? '',
                    items[index]['subTopic'] ?? '');
              },
            ),
          ),
        ),
      ),
    );
  }

  void _showDescriptionDialog(
      BuildContext context, String description, String topic, String subTopic) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return Dialog(
          
          child: Padding(
            padding: const EdgeInsets.all(0),
            child: Stack(children: [
              // Container(
              //   height: 200,
              //   child: _TopPortion(topic: topic, subTopic: subTopic),
              // ),
              Container(
                height: 250,
                child: Column(
                  children: [
                    SizedBox(
                      height: 100,
                      child: _TopPortion(topic: topic, subTopic: subTopic)),
                    Padding(
                      padding: const EdgeInsets.only(left:20.0),
                      child: ListTile(
                        leading: Icon(Icons.location_city),
                        title: Text(topic),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left:20.0),
                      child: ListTile(
                        leading: Icon(Icons.location_on),
                        title: Text(topic),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left:20.0),
                      child: ListTile(
                        leading: Icon(Icons.lock_clock),
                        title: Text(topic),
                      ),
                    )
                  ],
                ),
              )
            ]),
          ),
          // content: Text(
          //   description,
          //   style: const TextStyle(color: Colors.black54),
          // ),
          // actions: [
          //   TextButton(
          //     onPressed: () {
          //       Navigator.of(context).pop();
          //     },
          //     child: const Text(
          //       'Close',
          //       style: TextStyle(color: Colors.black45),
          //     ),
          //   ),
          // ],
          backgroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20.0),
          ),
        );
      },
    );
  }
}

// ignore: unused_element
class _TopPortion extends StatelessWidget {
  const _TopPortion({required this.topic, required this.subTopic});

  final String topic;
  final String subTopic;

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: [
        Container(
          margin: const EdgeInsets.only(bottom: 10),
          decoration: const BoxDecoration(
              gradient: LinearGradient(
                  begin: Alignment.bottomCenter,
                  end: Alignment.topCenter,
                  colors: [
                    Color.fromARGB(255, 12, 38, 71),
                    Color.fromARGB(195, 12, 38, 71)
                  ]),
              borderRadius: BorderRadius.only(
                // bottomLeft: Radius.circular(50),
                // bottomRight: Radius.circular(50),
                topLeft: Radius.circular(20.0),
                topRight: Radius.circular(20.0),
              )),
        ),
        Align(
          alignment: Alignment.center,
          child: Padding(
            padding: const EdgeInsets.only(left:8.0),
            child: ListTile(
              leading: const Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.work, color: Colors.white),
                ],
              ),
              title: Text(subTopic, style: TextStyle(color: Colors.white),),
            ),
          ),
        )
      ],
    );
  }
}
