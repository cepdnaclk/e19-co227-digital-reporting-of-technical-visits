import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:visitlog/Controllers/task_controller.dart';
import 'package:visitlog/Screens/arrival_confirm.dart';

import 'package:visitlog/Utils/date_time.dart';


class TodayTaskBuildItem extends StatelessWidget {
  final TaskController controller = Get.put(TaskController());

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<List<Map<String, String>>>(
      stream: controller.taskItemsStream,
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          final List<Map<String, String>> taskItems = snapshot.data!;

          return ListView.builder(
            itemCount: taskItems.length,
            itemBuilder: (context, index) {
              final item = taskItems[index];

              return Padding(
                padding: const EdgeInsets.only(left: 30, right: 30, bottom: 10),
                child: SizedBox(
                  height: 75,
                  child: Card(
                    color: Color.fromARGB(255, 55, 55, 55),
                    shadowColor: const Color.fromARGB(220, 50, 152, 192),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20.0),
                    ),
                    elevation: 10,
                    margin: const EdgeInsets.all(4.0),
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
                          item['name'] ?? '',
                          style: const TextStyle(color: Colors.white),
                        ),
                        subtitle: Text(
                          item['subTopic'] ?? '',
                          style: const TextStyle(
                              color: Color.fromARGB(255, 185, 227, 247)),
                        ),
                        trailing: IconButton(
                          icon: const Icon(
                            Icons.arrow_forward,
                            color: Colors.white,
                          ),
                          onPressed: () {
                            _showDescriptionDialog(
                              context,
                              item['description'] ?? '',
                              item['name'] ?? '',
                              item['subTopic'] ?? '',
                              item['location'] ?? '',
                              getDateInFormat(DateTime.parse(item['time']!)),
                              TimeTo12Hour(DateTime.parse(item['time']!)),
                              item['id'] ?? '',
                            );
                          },
                        ),
                        onTap: () {
                          _showDescriptionDialog(
                            context,
                            item['description'] ?? '',
                            item['name'] ?? '',
                            item['subTopic'] ?? '',
                            item['location'] ?? '',
                            getDateInFormat(DateTime.parse(item['time']!)),
                            TimeTo12Hour(DateTime.parse(item['time']!)),
                            item['id'] ?? '',
                          );
                        },
                      ),
                    ),
                  ),
                ),
              );
            },
          );
        } else if (snapshot.hasError) {
          // Handle error here
          return Center(child: Text('Error fetching data: ${snapshot.error}'));
        } else {
          // Display loading spinner here
          return Center(
          child: CircularProgressIndicator(),
        );
        }
      },
    );
  }

  void _showDescriptionDialog(BuildContext context, String description,
      String topic, String subTopic, String location, String date, String time, String id) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return Dialog(
          backgroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20.0),
          ),
          child: Padding(
            padding: const EdgeInsets.all(0),
            child: Stack(children: [
              Container(
                height: 390,
                child: Column(
                  children: [
                    SizedBox(
                        height: 92,
                        child: _TopPortion(topic: topic, subTopic: subTopic)),
                    Padding(
                      padding: const EdgeInsets.only(left: 20.0),
                      child: ListTile(
                        leading: const Icon(Icons.location_city),
                        title: Text(
                          topic,
                          style: const TextStyle(
                            fontWeight: FontWeight.w600,
                            color: Colors.black87,
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 20.0),
                      child: ListTile(
                        leading: const Icon(Icons.location_on),
                        title: Text(
                          location,
                          style: const TextStyle(
                            fontWeight: FontWeight.w600,
                            color: Colors.black87,
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 20.0),
                      child: ListTile(
                        leading: const Icon(Icons.calendar_month),
                        title: Text(
                          date,
                          style: const TextStyle(
                            fontWeight: FontWeight.w600,
                            color: Colors.black87,
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 20.0),
                      child: ListTile(
                        leading: const Icon(Icons.access_time),
                        title: Text(
                          time,
                          style: const TextStyle(
                            fontWeight: FontWeight.w600,
                            color: Colors.black87,
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(
                        left: 20.0,
                        right: 20.0,
                        bottom: 20.0,
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          ElevatedButton(
                            onPressed: () {
                              Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => ArrivalConfirm(
                                          topic: topic,
                                          subTopic: subTopic,
                                          location: location,
                                          description: description,
                                          docId: id,)));
                            },
                            style: ElevatedButton.styleFrom(
                              shape: const StadiumBorder(),
                              backgroundColor: Colors.blueGrey,
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  const Text(
                                    'Get in to the JOB',
                                    style: TextStyle(fontSize: 15),
                                  ),
                                  SizedBox(width: 1.0.w),
                                  const Icon(Icons.arrow_forward)
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    )
                  ],
                ),
              )
            ]),
          ),
        );
      },
    );
  }
}

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
                topLeft: Radius.circular(20.0),
                topRight: Radius.circular(20.0),
              )),
        ),
        Align(
          alignment: Alignment.center,
          child: Padding(
            padding: const EdgeInsets.only(left: 8.0),
            child: ListTile(
              leading: const Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.work, color: Colors.white),
                ],
              ),
              title: Text(
                subTopic,
                style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                    fontSize: 16),
              ),
            ),
          ),
        )
      ],
    );
  }
}
