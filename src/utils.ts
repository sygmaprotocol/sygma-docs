export function capName (name: string): string {
    return name
      .split('_')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };

export function capLongName(name: string): string {
    return name
        .split(/[-_]+/) // Split by spaces or dashes
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
        .join(' '); // Join without spaces
}