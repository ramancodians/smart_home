
#include "Util.h"

namespace Util
{
  char* stringToString(String s) {
    int str_len = s.length() + 1;
    char *char_array = new char[str_len];
    s.toCharArray(char_array, str_len);
    return char_array;
  }
}
