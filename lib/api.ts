export async function getMe() {
  const access = typeof window !== "undefined" ? localStorage.getItem("access") : null

  if (!access) return null

  const res = await fetch("http://localhost:8000/api/v1/users/me", {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  })

  if (!res.ok) return null

  return res.json()
}
