export async function asyncHandler<T>(
  promise: Promise<T>,
): Promise<[T, undefined] | [undefined, any]> {
  try {
    const data = await promise;
    return [data, undefined] as const;
  } catch (error) {
    return [undefined, error] as const;
  }
}
