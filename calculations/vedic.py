# VEDIC MATH ENGINE
# Returns: result , steps list

def add(inputs):
    a = inputs.get("a", "0")
    b = inputs.get("b", "0")

    # convert to string for digit-wise addition
    a_str = str(a)
    b_str = str(b)

    steps = []
    steps.append(f"Vedic Addition using 'Right to Left' method")
    steps.append(f"Numbers: {a_str} + {b_str}")

    # make same length
    max_len = max(len(a_str), len(b_str))
    a_str = a_str.zfill(max_len)
    b_str = b_str.zfill(max_len)

    carry = 0
    result_digits = []

    # right → left addition (like mental math)
    for i in range(max_len - 1, -1, -1):
        d1 = int(a_str[i])
        d2 = int(b_str[i])

        total = d1 + d2 + carry
        digit = total % 10
        carry = total // 10

        steps.append(f"{d1} + {d2} + carry → {total}  (write {digit}, carry {carry})")
        result_digits.insert(0, str(digit))

    # final carry
    if carry > 0:
        result_digits.insert(0, str(carry))
        steps.append(f"Final carry added → {carry}")

    result = int("".join(result_digits))
    steps.append(f"Final Answer = {result}")

    return result, steps
