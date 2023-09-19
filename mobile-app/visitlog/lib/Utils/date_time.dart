import 'package:intl/intl.dart';

String getTimeString(int time) {
  final hour = time ~/ 100;
  final minutes = time % 100;
  final dateTime = DateTime(2000, 1, 1, hour, minutes);
  final timeFormat = DateFormat('h:mm a', 'en_US');
  return timeFormat.format(dateTime);
}

String getDateInFormat(DateTime date) {
  final dateOptions = DateFormat('EEEE, MMMM d', 'en_US');
  return dateOptions.format(date);
}

// ignore: non_constant_identifier_names
String TimeTo12Hour(DateTime dateTime) {
  final timeFormat = DateFormat('h:mm a', 'en_US');
  return timeFormat.format(dateTime);
}

String convertTimeToFormat(String inputTime) {
  final hours = inputTime.split(":")[0];
  final minutes = inputTime.split(":")[1];
  final formattedTime = hours + minutes;
  return formattedTime;
}

