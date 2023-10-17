// import 'dart:io';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:visitlog/Controllers/task_controller.dart';
import 'package:visitlog/Utils/date_time.dart';
// import 'package:http/http.dart' as http;
// import 'package:path_provider/path_provider.dart';
import 'package:url_launcher/url_launcher.dart';
// import 'package:dio/dio.dart';
// import 'package:downloads_path_provider_28/downloads_path_provider_28.dart';
// import 'package:permission_handler/permission_handler.dart';

class JobCardsList extends StatelessWidget {
  final String searchWord;
  final String sortCriteria;

  JobCardsList({
    super.key,
    required this.searchWord,
    required this.sortCriteria,
  });

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(TaskController());
    return Obx(() {
      // Check if data is loading
      if (controller.isLoading.value) {
        // Display a circular loader while data is loading
        return const Center(
          child: CircularProgressIndicator(),
        );
      } else if (controller.jobs.isEmpty) {
        // Handle case when there is no data
        return const Center(
          child: Text('No Completed Jobs available.'),
        );
      } else {
        // print("JobCard: ${searchWord}");

        // Filter and sort the task items
        // Sort the task items
        final sortedItems = controller.jobs
          ..sort((a, b) {
            // Sort by sortCriteria
            switch (sortCriteria) {
              case 'Company':
                return a['name']?.compareTo(b['name']!) ?? 0;
              case 'Task':
                return a['subTopic']?.compareTo(b['subTopic']!) ?? 0;
              case 'DateTime':
                return DateTime.parse(a['time']!)
                    .compareTo(DateTime.parse(b['time']!));
              default:
                return 0;
            }
          });

        final filteredAndSortedItems = sortedItems
            .where((item) =>
                item['name']
                    ?.toLowerCase()
                    .contains(searchWord.toLowerCase()) ??
                true)
            .toList();

        // Display the filtered and sorted task items
        return ListView.builder(
          itemCount: filteredAndSortedItems.length,
          itemBuilder: (context, index) {
            final item = filteredAndSortedItems[index];

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
                            item['technicianReportUrl'] ?? '',
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
                          item['technicianReportUrl'] ?? '',
                        );
                      },
                    ),
                  ),
                ),
              ),
            );
          },
        );
      }
    });
  }

  void _showDescriptionDialog(
      BuildContext context,
      String description,
      String topic,
      String subTopic,
      String location,
      String date,
      String time,
      String technicianReportUrl) {
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
                height: 260,
                child: Column(
                  children: [
                    SizedBox(
                        height: 92,
                        child: _TopPortion(
                          topic: topic,
                          subTopic: subTopic,
                          pdfUrl: technicianReportUrl,
                        )),
                    Padding(
                      padding: const EdgeInsets.only(left: 20.0, top: 10),
                      child: ListTile(
                        leading: const Icon(Icons.location_city),
                        title: Text(
                          topic,
                          style: const TextStyle(
                            fontSize: 15.5,
                            fontWeight: FontWeight.w600,
                            color: Colors.black87,
                          ),
                        ),
                        dense: true,
                        visualDensity: VisualDensity(vertical: -3),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 20.0),
                      child: ListTile(
                        leading: const Icon(Icons.location_on),
                        title: Text(
                          location,
                          style: const TextStyle(
                            fontSize: 15.5,
                            fontWeight: FontWeight.w600,
                            color: Colors.black87,
                          ),
                        ),
                        dense: true,
                        visualDensity: VisualDensity(vertical: -3),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 20.0),
                      child: ListTile(
                        leading: const Icon(Icons.calendar_month),
                        title: Text(
                          date,
                          style: const TextStyle(
                            fontSize: 15.5,
                            fontWeight: FontWeight.w600,
                            color: Colors.black87,
                          ),
                        ),
                        dense: true,
                        visualDensity: VisualDensity(vertical: -3),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 20.0),
                      child: ListTile(
                        leading: const Icon(Icons.access_time),
                        title: Text(
                          time,
                          style: const TextStyle(
                            fontSize: 15.5,
                            fontWeight: FontWeight.w600,
                            color: Colors.black87,
                          ),
                        ),
                        dense: true,
                        visualDensity: VisualDensity(vertical: -3),
                      ),
                    ),
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
  const _TopPortion(
      {required this.topic, required this.subTopic, required this.pdfUrl});

  final String topic;
  final String subTopic;
  final String pdfUrl;

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
                    Color.fromARGB(255, 12, 71, 51),
                    Color.fromARGB(195, 12, 71, 32),
                  ]),
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(20.0),
                topRight: Radius.circular(20.0),
              )),
        ),
        Align(
          alignment: Alignment.center,
          child: Padding(
            padding: const EdgeInsets.only(
              left: 10.0,
              bottom: 18.0,
            ),
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
                    fontWeight: FontWeight.w800,
                    fontSize: 16),
              ),
            ),
          ),
        ),
        Align(
          alignment: Alignment.bottomCenter,
          child: SizedBox(
            width: 180,
            height: 35,
            child: Stack(
              fit: StackFit.expand,
              children: [
                ElevatedButton(
                  onPressed: () async {
                    try {
                      await launchUrl(Uri.parse(pdfUrl));
                    } catch (e) {
                      print('Error opening PDF: $e');
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    foregroundColor: Colors.white,
                    backgroundColor:
                        Color.fromARGB(255, 28, 124, 202), // Text color
                    padding: EdgeInsets.symmetric(
                        vertical: 2, horizontal: 14), // Padding
                    shape: RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius.circular(10), // Rounded corners
                    ),
                    elevation: 4, // Button shadow
                  ),
                  child: Text(
                    'Download Report ⍗',
                    style: TextStyle(fontSize: 15),
                  ),
                ),
              ],
            ),
          ),
        )
      ],
    );

    // Added debugWidget to display the searchWord and sortCriteria variables
  }
}
