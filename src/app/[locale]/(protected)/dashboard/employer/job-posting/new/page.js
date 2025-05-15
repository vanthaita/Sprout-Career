'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Globe, Lock, CircleDollarSign, Tags, AlertCircle, StickyNote } from 'lucide-react'
import MDEditor from '@uiw/react-md-editor'
import axiosInstance from '@/axios/axiosIntance'

const JobPostingForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobId = searchParams.get('jobId')
  const [formData, setFormData] = useState({
    title: '',
    jobType: 'FULL_TIME',
    location: '',
    primaryTag: '',
    salaryMin: '',
    salaryMax: '',
    salaryCurrency: 'USD',
    salaryPeriod: 'YEAR',
    description: '',
    requirements: '',
    tags: '',
    benefits: [],
    visibility: 'PUBLIC'
  })
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)


  const fetchJob = async (id) => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`/employer/jobs/${id}`)
      const jobData = response.data.data || response.data
      
      const benefits = Array.isArray(jobData.benefits) ? jobData.benefits : 
                      (jobData.benefits ? jobData.benefits.split(',') : [])
      
      setFormData({
        title: jobData.title || '',
        jobType: jobData.jobType || 'FULL_TIME',
        location: jobData.location || '',
        primaryTag: jobData.primaryTag || '',
        salaryMin: jobData.salaryMin || '',
        salaryMax: jobData.salaryMax || '',
        salaryCurrency: jobData.salaryCurrency || 'USD',
        salaryPeriod: jobData.salaryPeriod || 'YEAR',
        description: jobData.description || '',
        requirements: jobData.requirements || '',
        tags: jobData.tags || '',
        benefits: benefits,
        visibility: jobData.visibility || 'PUBLIC'
      })
      
      toast.success('Job loaded successfully')
    } catch (error) {
      console.error("Error fetching job:", error)
      toast.error('Failed to load job details')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (jobId) {
      setIsEditing(true)
      fetchJob(jobId)
    }
  }, [jobId])

  

  

  const salaryCurrencies = [
    { value: 'USD', label: '$ USD' },
    { value: 'EUR', label: '€ EUR' },
    { value: 'GBP', label: '£ GBP' },
    { value: 'JPY', label: '¥ JPY' },
    { value: 'CAD', label: 'CA$ CAD' },
    { value: 'AUD', label: 'AU$ AUD' }
  ]

  const salaryPeriods = [
    { value: 'HOUR', label: 'per hour' },
    { value: 'DAY', label: 'per day' },
    { value: 'WEEK', label: 'per week' },
    { value: 'MONTH', label: 'per month' },
    { value: 'YEAR', label: 'per year' },
    { value: 'PROJECT', label: 'per project' }
  ]

  const jobTypes = [
    { value: 'FULL_TIME', label: 'Full-time' },
    { value: 'PART_TIME', label: 'Part-time' },
    { value: 'CONTRACT', label: 'Contract' },
    { value: 'INTERNSHIP', label: 'Internship' },
    { value: 'TEMPORARY', label: 'Temporary' }
  ]

  const benefitsOptions = [
    { id: '401k', label: '💰 401(k)', icon: <CircleDollarSign className="h-4 w-4" /> },
    { id: 'distributed_team', label: '🌎 Distributed team' },
    { id: 'async', label: '⏰ Async' },
    { id: 'vision_insurance', label: '🤓 Vision insurance' },
    { id: 'dental_insurance', label: '🦷 Dental insurance' },
    { id: 'medical_insurance', label: '🚑 Medical insurance' },
    { id: 'unlimited_vacation', label: '🏖 Unlimited vacation' },
    { id: 'paid_time_off', label: '🏖 Paid time off' },
    { id: '4day_workweek', label: '📆 4 day workweek' },
    { id: '401k_matching', label: '💰 401k matching' },
    { id: 'company_retreats', label: '🏔 Company retreats' },
    { id: 'coworking_budget', label: '🏬 Coworking budget' },
    { id: 'learning_budget', label: '📚 Learning budget' },
    { id: 'gym_membership', label: '💪 Free gym membership' },
    { id: 'wellness_budget', label: '🧘 Mental wellness budget' },
    { id: 'home_office_budget', label: '🖥 Home office budget' },
    { id: 'crypto_pay', label: '🥧 Pay in crypto' },
    { id: 'pseudonymous', label: '🥸 Pseudonymous' },
    { id: 'profit_sharing', label: '💰 Profit sharing' },
    { id: 'equity', label: '💰 Equity compensation' },
    { id: 'no_whiteboard', label: '⬜️ No whiteboard interview' },
    { id: 'no_monitoring', label: '👀 No monitoring system' },
    { id: 'no_politics', label: '🚫 No politics at work' },
    { id: 'age_inclusive', label: '🎅 We hire old (and young)' }
  ]

  const popularTags = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 
    'Django', 'Ruby', 'Rails', 'Java', 'Spring', 'Kotlin', 
    'Swift', 'iOS', 'Android', 'Flutter', 'Go', 'Rust', 
    'PHP', 'Laravel', 'C#', '.NET', 'SQL', 'PostgreSQL', 
    'MongoDB', 'Redis', 'AWS', 'Azure', 'GCP', 'Docker', 
    'Kubernetes', 'Terraform', 'Git', 'CI/CD', 'DevOps', 
    'Frontend', 'Backend', 'Fullstack', 'Mobile', 'Blockchain', 
    'Crypto', 'Web3', 'Solidity', 'AI', 'Machine Learning', 
    'Data Science', 'Analytics', 'Product', 'Design', 'UI/UX', 
    'Marketing', 'Sales', 'Finance', 'HR', 'Remote', 
    'Hybrid', 'Onsite', 'Entry Level', 'Senior', 'Lead'
  ]

  const primaryTags = [
    'Engineering', 'Product', 'Design', 'Marketing', 
    'Sales', 'Customer Support', 'Data Science', 
    'DevOps', 'Security', 'Finance', 'HR', 
    'Operations', 'Education', 'Healthcare', 
    'Legal', 'Other'
  ]

  const popularLocations = [
    'Remote', 'Remote (US)', 'Remote (EU)', 'Remote (Global)',
    'New York, NY', 'San Francisco, CA', 'Los Angeles, CA',
    'Chicago, IL', 'Austin, TX', 'Seattle, WA', 'Boston, MA',
    'London, UK', 'Berlin, Germany', 'Paris, France',
    'Amsterdam, Netherlands', 'Tokyo, Japan', 'Singapore',
    'Sydney, Australia', 'Toronto, Canada', 'Vancouver, Canada'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNumberChange = (e) => {
    const { name, value } = e.target
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleDescriptionChange = (value) => {
    setFormData(prev => ({
      ...prev,
      description: value || ''
    }))
  }

  const handleRequirementsChange = (value) => {
    setFormData(prev => ({
      ...prev,
      requirements: value || ''
    }))
  }

  const handleBenefitsChange = (benefitId) => {
    setFormData(prev => {
      const currentBenefits = [...prev.benefits]
      const index = currentBenefits.indexOf(benefitId)
      if (index === -1) {
        currentBenefits.push(benefitId)
      } else {
        currentBenefits.splice(index, 1)
      }
      
      return {
        ...prev,
        benefits: currentBenefits
      }
    })
  }

  const handleVisibilityChange = (value) => {
    setFormData(prev => ({
      ...prev,
      visibility: value
    }))
  }

  const handleTagSelect = (tag) => {
    setFormData(prev => {
      const currentTags = prev.tags ? prev.tags.split(',') : []
      
      if (currentTags.includes(tag)) {
        const updatedTags = currentTags.filter(t => t !== tag)
        return {
          ...prev,
          tags: updatedTags.join(',')
        }
      } else {
        return {
          ...prev,
          tags: [...currentTags, tag].join(',')
        }
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        setLoading(true)
        
        const salaryRange = formData.salaryMin && formData.salaryMax 
            ? `${formData.salaryCurrency}${formData.salaryMin} - ${formData.salaryCurrency}${formData.salaryMax} ${salaryPeriods.find(p => p.value === formData.salaryPeriod)?.label || ''}`
            : ''
        
        const dataToSubmit = {
            ...formData,
            salaryRange
        }
        console.log(dataToSubmit);
        if (isEditing) {
            await axiosInstance.put(`/employer/jobs/${jobId}`, dataToSubmit)
            toast.success('Job updated successfully')
        } else {
            await axiosInstance.post('/employer/jobs', dataToSubmit)
            toast.success('Job created successfully')
        }
        
        router.push('/dashboard/employer/job-posting')
    } catch (error) {
      console.error("Error submitting job:", error)
      toast.error(error.response?.data?.message || 'Failed to submit job')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen ">
      <header className="bg-white border-b">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#3A6B4C]">
              <StickyNote className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold">
              {isEditing ? 'Edit Job Posting' : 'Create New Job Posting'}
            </h1>
          </div>
        </div>
      </header>
      
      <div className="py-6 px-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="title" className="text-gray-700">Job Title</Label>
              <AlertCircle className="h-4 w-4 text-gray-500" />
            </div>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. 'Senior React Developer' or 'Marketing Manager'"
              required
              className="focus-visible:ring-[#3A6B4C]"
            />
            <div className="text-sm text-gray-500 bg-yellow-50 p-3 rounded-md border border-yellow-100">
              <p className="mb-1">• Please specify a single job position like &quot;Marketing Manager&quot; or &quot;Node JS Developer&quot;</p>
              <p className="mb-1">• We know your job is important but please DO NOT WRITE IN FULL CAPS</p>
              <p className="mb-1">• If posting multiple roles, please create multiple job posts</p>
              <p>• We only allow real jobs, no MLM-type courses</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-700">Primary Tag (Category)</Label>
            <Select 
              value={formData.primaryTag} 
              onValueChange={(value) => setFormData({...formData, primaryTag: value})}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select primary category" />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                {primaryTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="tags" className="text-gray-700">
                <Tags className="h-4 w-4 inline mr-1 text-gray-600" />
                Tags, keywords or stack*
              </Label>
            </div>
            <Input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. react, javascript, remote, fullstack"
              className="focus-visible:ring-[#3A6B4C]"
            />
            <div className="text-sm text-gray-500">
              Short tags are preferred. Use tags like industry and tech stack. The first 3-4 tags are shown on the site.
            </div>
            
            <div className="mt-2">
              <Label className="text-sm text-gray-600 mb-2 block">Popular Tags:</Label>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => {
                  const isSelected = formData.tags?.split(',').includes(tag)
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagSelect(tag)}
                      className={`px-3 py-1 text-sm rounded-sm border ${
                        isSelected 
                          ? 'bg-[#3A6B4C] text-white border-[#3A6B4C]'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {tag}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-700">Job Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData({...formData, jobType: value})}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  {jobTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-700">Location</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData({...formData, location: value})}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select or type a location" />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  {popularLocations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Or type a custom location"
                className="focus-visible:ring-[#3A6B4C] mt-2"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-700">Salary Range</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <Label htmlFor="salaryCurrency" className="text-xs text-gray-600">Currency</Label>
                <Select 
                  value={formData.salaryCurrency} 
                  onValueChange={(value) => setFormData({...formData, salaryCurrency: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    {salaryCurrencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="salaryMin" className="text-xs text-gray-600">Min</Label>
                <Input
                  id="salaryMin"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleNumberChange}
                  placeholder="Min"
                  className="focus-visible:ring-[#3A6B4C]"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="salaryMax" className="text-xs text-gray-600">Max</Label>
                <Input
                  id="salaryMax"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleNumberChange}
                  placeholder="Max"
                  className="focus-visible:ring-[#3A6B4C]"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="salaryPeriod" className="text-xs text-gray-600">Period</Label>
                <Select 
                  value={formData.salaryPeriod} 
                  onValueChange={(value) => setFormData({...formData, salaryPeriod: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    {salaryPeriods.map((period) => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-700">Job Visibility</Label>
            <ToggleGroup 
              type="single" 
              value={formData.visibility}
              onValueChange={handleVisibilityChange}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              <ToggleGroupItem 
                value="PUBLIC" 
                className="data-[state=on]:bg-[#3A6B4C] data-[state=on]:text-white border-gray-200"
              >
                <Globe className="h-4 w-4 mr-2" />
                Public Job
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="PRIVATE" 
                className="data-[state=on]:bg-[#3A6B4C] data-[state=on]:text-white border-gray-200"
              >
                <Lock className="h-4 w-4 mr-2" />
                Private Job
              </ToggleGroupItem>
            </ToggleGroup>
            <div className="text-sm text-gray-500">
              Public jobs are visible to all users. Private jobs are only visible to users with a direct link.
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-700">Description (Markdown supported)</Label>
            <div data-color-mode="light" className="border rounded-md overflow-hidden">
              <MDEditor
                value={formData.description}
                onChange={handleDescriptionChange}
                height={300}
                preview="edit"
              />
            </div>
            <div className="text-sm text-gray-500">
              You can use markdown to format your job description
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-gray-700">Requirements (Markdown supported)</Label>
            <div data-color-mode="light" className="border rounded-md overflow-hidden">
              <MDEditor
                value={formData.requirements}
                onChange={handleRequirementsChange}
                height={300}
                preview="edit"
              />
            </div>
            <div className="text-sm text-gray-500">
              List the requirements for this position using markdown
            </div>
          </div>
          
          <div className="space-y-4">
            <Label className="text-gray-700">Benefits (Select all that apply)</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {benefitsOptions.map((benefit) => (
                <div key={benefit.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`benefit-${benefit.id}`}
                    checked={formData.benefits.includes(benefit.id)}
                    onChange={() => handleBenefitsChange(benefit.id)}
                    className="h-4 w-4 rounded border-gray-300 text-[#3A6B4C] focus:ring-[#3A6B4C]"
                  />
                  <label htmlFor={`benefit-${benefit.id}`} className="text-sm font-medium leading-none text-gray-700">
                    {benefit.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/employer/job-posting')}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              style={{ backgroundColor: '#3A6B4C' }}
              className="text-white hover:bg-[#2E5540] w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEditing ? 'Updating...' : 'Creating...'}
                </span>
              ) : isEditing ? 'Update Job' : 'Create Job'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobPostingForm