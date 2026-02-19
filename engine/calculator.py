import math

def calculate(operation, a=None, b=None, extra=None):

    if operation == "add":
        return float(a) + float(b)

    elif operation == "sub":
        return float(a) - float(b)

    elif operation == "mul":
        return float(a) * float(b)

    elif operation == "div":
        if float(b) == 0:
            return "Cannot divide by zero"
        return float(a) / float(b)

    elif operation == "power":
        return float(a) ** float(b)

    elif operation == "sqrt":
        return math.sqrt(float(a))

    elif operation == "prime":
        n = int(a)
        if n < 2:
            return "Not Prime"
        for i in range(2, int(n**0.5) + 1):
            if n % i == 0:
                return "Not Prime"
        return "Prime"

    elif operation == "factor":
        n = int(a)
        result = 1
        for i in range(1, n + 1):
            result *= i
        return result

    elif operation == "stats":
        numbers = list(map(float, extra.split(",")))
        mean = sum(numbers) / len(numbers)
        return f"Mean = {mean}"

    elif operation == "sort":
        numbers = list(map(float, extra.split(",")))
        numbers.sort()
        return numbers

    elif operation == "poly":
        return f"Polynomial received: {a}"

    elif operation == "equation":
        return f"Equation received: {a}"

    else:
        return "Invalid Operation"
